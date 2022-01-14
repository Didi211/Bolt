
const { status } = require('express/lib/response');
const neo4j = require('../config/neo4j_config');
const customer = require('../models/orderModel');
const { GetMealPrice } = require('./mealController');
const redis_client = require('../config/ws.config')
const {RecordsToJSON,NodeTOString, NodeToJson} = require('../helpers')
const StatusFlags = require('../statusFlags');
const statusFlags = require('../statusFlags');




const GetCustomerID = async (orderID) => { 
    try {
        let customer = await neo4j.cypher(
            `match (c:Customer) -[:ORDERED]-> (o:Order {orderID: "${orderID}"}) return c`);
        if (customer.records.length < 1) { 
            throw new Error("Couldn't find customer.");
        }
        let customerID = RecordsToJSON(customer.records)[0].uuid;   
        return customerID;
    } catch (e) {
        throw e;
    }
}

const CreateOrder = async (req,res) => { //push ka restoranu, kreira se u redis i neo4j bazama
    let price = 0
    try { 

        for await (let element of req.body.meals) {
            price += await GetMealPrice(element)
        }
        console.log(StatusFlags.pending);
        let order = await neo4j.model("Order").create({
            price: price,
            onAddress: req.body.onAddress,
            note: req.body.note != "" ? req.body.note : null,    
            status: StatusFlags.pending
        });
        let orderJson = NodeToJson(order);

        let relationResult = await neo4j.cypher(
            `match (c:Customer {uuid: "${req.body.uuid}"}),
                    (o:Order {orderID: "${order._properties.get('orderID')}"})
                    create (c)-[rel:ORDERED]->(o) return rel`);
    
        if (relationResult.records.length < 1) {
            throw new  Error("Couldn't create relation");
        }
        let allMeals = [];
        for await (let mealID of req.body.meals) { 
            let mealResult = await neo4j.cypher(
                `match (o:Order {orderID : "${order._properties.get("orderID")}"}),
                (m:Meal  {mealID: "${mealID}"}) 
                create (o)-[rel:CONTAINS]->(m) return m`);
            let mealJson = RecordsToJSON(mealResult.records);
            mealJson.forEach(element => {
                allMeals.push(element);
            });
            
        }
        let poruka = { 
            order : orderJson,
            storeID: req.body.storeID,
            meals: allMeals
        }
        console.log("Poruka:",poruka);
        await redis_client.publish("app:store",JSON.stringify(poruka));
        //ili ovako, da u redisu pamtimo samo  orderedok se ne izvrse ali ne cele objekte, vec njihov id i status 
        await redis_client.sAdd('orders:pending',`'${orderJson.orderID}'`);
        // redis_client.hSet('ordersPending',`${orderJson.orderID}`,JSON.stringify(poruka));
        await redis_client.expire('orders:pending',24*60*60); //problem, hocu da se kes izbrise u 11:59 uvece
        res.status(200).end();
    }
    catch(e) { 
        res.status(500).send(e);
        console.log(e);
    }
    
}
const AcceptOrderRestaraunt = async (req,res) =>{  // push ka klijentu i ka dostavljacima, status u redisu se menja

    try {
        let relationResult = await neo4j.cypher(
            `match (o:Order {orderID : "${req.body.orderID}"}),
            (s:Store  {uuid: "${req.body.storeID}"})
            create (s)-[rel:PREPARES]->(o) return rel`);

        if (relationResult.records.length < 1) {
            throw new  Error("Couldn't create relation");
        }
      
        let order = await neo4j.model('Order').find(req.body.orderID);
        let store = await neo4j.model('Store').find(req.body.storeID);
        
        
        if (!order) { 
            throw new Error("Couldn't find object.")
        }
        if (!store) { 
            throw new Error("Couldn't find object.")
        }
        await redis_client.sRem('orders:pending',`'${req.body.orderID}'`); 
        await redis_client.sAdd('orders:accepted',`'${req.body.orderID}'`);
        await redis_client.expire('orders:accepted',24*60*60); //problem, hocu da se kes izbrise u 11:59 uvece
        let porukaCustomer = { 
            orderID : req.body.orderID,
            customerID: await GetCustomerID(req.body.orderID),
            status: StatusFlags.accepted
        }
        let porukaDeliverer = { 
            order: NodeToJson(order),
            storeID: NodeToJson(store) 
        }
        console.log('porukaCostumer:',porukaCustomer);
        console.log('porukaDeliverer:',porukaDeliverer);
        await redis_client.publish('app:deliverer',JSON.stringify(porukaDeliverer));
        await redis_client.publish('app:customer',JSON.stringify(porukaCustomer)); 

        res.status(200).send();

    }
    catch(e) { 
        res.status(500).send(e);
        console.log(e);
    }


}
const DeclineOrderRestaraunt = async (req,res) =>{ // push ka klijentu ,status u redisu se menja (brise se iz redisa)

    try {
        let queryResult = await neo4j.cypher(
            `match (o:Order {orderID : "${req.body.orderID}"})
            SET o.status = "${StatusFlags.declined}" return o`);
        
        if (queryResult.records.length < 1) {
            throw new  Error("Couldn't create relation");
        }
        
        // await redis_client.hDel('orders',`${req.body.orderID}`); 
        let poruka = { 
            orderID : req.body.orderID,
            customerID: await GetCustomerID(req.body.orderID),
            status: StatusFlags.declined
        }
        await redis_client.sRem('orders:pending',`'${req.body.orderID}'`);
        await redis_client.publish('app:customer',JSON.stringify(poruka)); //ili da saljemo samo accepted 
        res.status(200).send();
    }
    catch(e) { 
        res.status(500).send(e);
    }
}
const AcceptOrderDeliverer = async (req,res) =>{ //push ka klijentu , ka dostavljacima ide forced refresh, ukoliko je prihvacena vec vrati resepnce da jeste,status u redisu se menja
    try {
        let queryResult = await neo4j.cypher(
            `match (o:Order {orderID : "${req.body.orderID}"}) <-[rel:DELIVERS]- (d:Deliverer)
            return rel`);
        if (queryResult.records.length > 0) { 
            res.status(226).send("Order already accepted.");
            //potrebno osveziti prikaz nakon ove poruku (izbaciti taj order na frontu)
            return;
        }
        queryResult = await neo4j.cypher(
            `match (o:Order {orderID: "${req.body.orderID}"}),
            (d:Deliverer  {uuid: "${req.body.delivererID}"})
            create (d)-[rel:DELIVERS]->(o) return rel`);
        if (queryResult.records.length < 1) { 
            throw new Error("Couldn't create relation.")
        }
        //redis change status
        await redis_client.sRem('orders:accepted',`'${req.body.orderID}'`);
        await redis_client.sAdd('orders:hasdeliverer',`'${req.body.orderID}'`);
        await redis_client.expire('orders:hasdeliverer',24*60*60);
        //update time Waiting
        
        let deliverer = await neo4j.model('Deliverer').find(req.body.delivererID);
        queryResult = await neo4j.cypher(
            `match (s:Store) -[:PREPARES]-> (o:Order {orderID: "${req.body.orderID}"})  return s`);
        if (queryResult.records.length < 1) { 
            res.status(400).send("Couldn't find store.");
            return;
        }
        let store = RecordsToJSON(queryResult.records);
        let storeJson;
        store.forEach(element => {
            storeJson = element;
        });
        
        // notify client, send avgTime
        let porukaCustomer = { 
            customerID: await GetCustomerID(req.body.orderID),
            orderID: req.body.orderID,
            timeWaiting: NodeToJson(deliverer).avgTime + (+storeJson.preptime),
            status:StatusFlags.hasDeliverer

        }
        //notify delivery guys for refresh
        let porukaDeliverer = { 
            refreshFlag: true
        }
        
        await redis_client.publish('app:customer',JSON.stringify(porukaCustomer));
        await redis_client.publish('app:deliverer',JSON.stringify(porukaDeliverer));
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }
    

    
}
const OrderReady = async (req,res) =>{     //push ka dostavljacima, status u redisu se menja
    try {
        await redis_client.sRem('orders:hasdeliverer',`'${req.body.orderID}'`);
        await redis_client.sAdd('orders:ready',`'${req.body.orderID}'`);
        await redis_client.expire('orders:ready',24*60*60);
        let queryResult = await neo4j.cypher(
            `match (d:Deliverer) -[:DELIVERS]->(o:Order {orderID: "${req.body.orderID}"}) return d`);
        if (queryResult.records.length === 0) { 
            res.status(400).send("Couldn't find deliverer.");
            return;
        }
        let deliverer = RecordsToJSON(queryResult.records);
        let delivererJson;
        deliverer.forEach(element => {
            delivererJson = element;
        });
        let porukaDeliverer = { 
            orderID: req.body.orderID,
            delivererID: delivererJson.uuid,
            status: statusFlags.ready
        }
        await redis_client.publish('app:deliverer',JSON.stringify(porukaDeliverer));
        res.status(200).send();
        
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
const OrderPickedUp = async(req,res) =>{ //push ka klijentu, statu u redisu se menja
    try {
        await redis_client.sRem('orders:ready',`'${req.body.orderID}'`);
        await redis_client.sAdd('orders:delivering',`'${req.body.orderID}'`);
        await redis_client.expire('orders:delivering',24*60*60);

        
        let porukaCustomer = { 
            orderID: req.body.orderID,
            customerID: await GetCustomerID(req.body.orderID),
            status: statusFlags.pickedUp
        }
       
        await redis_client.publish('app:customer',porukaCustomer)
        res.status(200).send();
        
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }


}
const OrderFinished = async (req,res) => { //push ka klijentu, status u neo4j se menja
    try {
        let queryResult = await  neo4j.cypher(
            `match (o:Order {orderID : "${req.body.orderID}"}) SET o.status = "${statusFlags.finished}" return o`);
        if (queryResult.length < 1) { 
            res.status(400).send("Couldn't find the order.");
            return;
        }
        queryResult = await neo4j.cypher(
            `match (c:Customer)-[r:ORDERED]->(o:Order {orderID: "${req.body.orderID}"}) return c`);
        if (queryResult.length < 1) { 
            res.status(400).send("Couldn't find the customer.");
            return;
        }

       
        let customerMsg = {
            customerID:  await GetCustomerID(req.body.orderID),
            status: statusFlags.finished
        }
        await redis_client.sRem('orders:delivering',`'${req.body.orderID}'`);
        await redis_client.publish('app:customer',JSON.stringify(customerMsg))
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

        
}



const GetPendingStore = async (req,res) => {
  
    try{
        let orderIDs =await redis_client.sMembers("orders:pending")
        if(orderIDs.length == 0){
            console.log("u ifu");
            res.status(200).send(orderIDs)}
        else{        
        let order  = await neo4j.cypher(`match (o:Order)-[r:CONTAINS]->(m:Meal)<-[rel:OFFERS]-(s:Store { uuid: "${req.params.storeID}"})  where o.orderID in [${orderIDs}]  return DISTINCT o`)
        let orders = RecordsToJSON(order.records)
        for await (let el of orders){
                let result = await neo4j.cypher(`match (o:Order { orderID : "${el.orderID}"})-[rel:CONTAINS]->(m:Meal) return m`)
                let meals = RecordsToJSON(result.records)            
                el.meals = meals        
        }        
        res.send(orders).status(200)
    }
    }catch(e){
        console.log(e);
        res.status(500).send(e)
    } 
}
const GetAcceptedStore = async (req,res) => {
    try{
        console.log("u apiuju");
        let ordersAcceptedIDs =  await redis_client.sMembers("orders:accepted").catch();
        console.log(ordersAcceptedIDs)
        let ordersHasDelivererIDs = await redis_client.sMembers("orders:hasdeliverer").catch();
        
        
        let ordersIDs = ordersAcceptedIDs.concat(ordersHasDelivererIDs);   
        console.log(typeof ordersIDs);
        
        if(ordersIDs.length == 0){
        console.log("u ifu");
            res.status(200).send(ordersIDs)}
        else{        
        let orderResult  = await neo4j.cypher(
            `match (o:Order) <-[:PREPARES]- (s:Store {uuid: "${req.params.storeID}"}) where o.orderID in [${ordersIDs}] return DISTINCT o `);
        let orders = RecordsToJSON(orderResult.records)
        for await (let el of orders){
                let result = await neo4j.cypher(`match (o:Order { orderID : "${el.orderID}"})-[rel:CONTAINS]->(m:Meal) return m`)
                let meals = RecordsToJSON(result.records)            
                el.meals = meals
                el.status = "Accepted"        
        }       
        res.send(orders).status(200)}
    }catch(e){
        res.status(500).send(e)
    }
    

}
const GetReadyStore = async (req,res) => {
    try{
        let ordersIDs = await redis_client.sMembers("orders:ready");
        if(ordersIDs.length == 0){            
            res.status(200).send(ordersIDs)}
        else{       
        let order  = await neo4j.cypher(`match (s:Store{uuid : "${req.params.storeID}"}) where o.orderID in [${ordersIDs}] return DISTINCT o`)
        let orders = RecordsToJSON(order.records)
        for await (let el of orders){
                let result = await neo4j.cypher(`match (o:Order { orderID : "${el.orderID}"})-[rel:CONTAINS]->(m:Meal) return m`)
                let meals = RecordsToJSON(result.records)            
                el.meals = meals
                el.status = "Ready"        
        }        
        res.send(orders).status(200)}

    }catch(e){
        res.status(500).send(e)
    }
}
const GetPendingDeliverer =async (req,res) => {
try {

    let ordersIDs = await redis_client.sMembers("orders:accepted");
    if(ordersIDs.length == 0){            
        res.status(200).send(ordersIDs)}
    else{    
    let orders = await neo4j.cypher(`match (o:Order) where o.orderID in [${ordersIDs}] return o`)
    let o = RecordsToJSON(orders.records)
    for await (let el of o){
        let restaraunt = await neo4j.cypher(`match (o:Order {orderID : "${el.orderID}"})-[r:CONTAINS]->(m:Meal)<-[rel:OFFERS]-(s:Store) return DISTINCT s`)
        el.restaraunt = RecordsToJSON(restaraunt.records)
        el.status = "Accepted"
    
    }
    res.send(o).status(200)}
} catch (e) {
    res.status(500).send(e)
}    
}
const GetAcceptedDeliverer =async (req,res) => {    
    try {
        let ordersIDs = await redis_client.sMembers("orders:hasdeliverer");

        if(ordersIDs.length == 0){            
            res.status(200).send(ordersIDs)}
        else{    
        let orders = await neo4j.cypher(`match (o:Order)<-[re:DELIVERS]-(d:Deliverer{uuid : "${req.params.delivererID}"}) where o.orderID in [${ordersIDs}] return o`)
        let o = RecordsToJSON(orders.records)
        for await (let el of o){
            let restaraunt = await neo4j.cypher(`match (o:Order {orderID : "${el.orderID}"})-[r:CONTAINS]->(m:Meal)<-[rel:OFFERS]-(s:Store) return DISTINCT s`)
            el.restaraunt = RecordsToJSON(restaraunt.records)
            el.status = "Has a deliverer"
        }
        res.send(o).status(200)
    }
    } catch (e) {
        res.status(500).send(e)
    }   
}


module.exports = {
    CreateOrder,
    AcceptOrderRestaraunt,
    GetAcceptedDeliverer,
    GetReadyStore,
    GetAcceptedStore,
    GetPendingStore,
    OrderFinished,
    OrderPickedUp,
    OrderReady,
    GetPendingDeliverer,
    AcceptOrderDeliverer,
    DeclineOrderRestaraunt
};