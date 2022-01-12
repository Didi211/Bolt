
const { status } = require('express/lib/response');
const neo4j = require('../config/neo4j_config');
const customer = require('../models/orderModel');
const { GetMealPrice } = require('./mealController');
const redis_client = require('../config/ws.config')
const {RecordsToJSON,NodeTOString, NodeToJson} = require('../helpers')
const StatusFlags = require('../statusFlags');
const statusFlags = require('../statusFlags');



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
            note: req.body.note,    
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
        // console.log(allMeals);
        let poruka = { 
            order : orderJson,
            storeID: req.body.storeID,
            meals: allMeals
        }
        // console.log("Poruka:",poruka);
        redis_client.publish("app:store",JSON.stringify(poruka));
        //ili ovako, da u redisu pamtimo samo  orderedok se ne izvrse ali ne cele objekte, vec njihov id i status 
        redis_client.hSet('orders',`${orderJson.orderID}`,StatusFlags.pending);
        // redis_client.hSet('ordersPending',`${orderJson.orderID}`,JSON.stringify(poruka));
        redis_client.expire('ordersPending',24*60*60); //problem, hocu da se kes izbrise u 11:59 uvece
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
        await redis_client.hDel('orders',`${req.body.orderID}`); 
        await redis_client.hSet('orders',`${req.body.orderID}`,StatusFlags.accepted);
        let poruka = { 
            orderID : req.body.orderID,
            status: StatusFlags.accepted
        }
        redis_client.publish('app:customer',JSON.stringify(poruka)); //ili da saljemo samo accepted 
        //valjda cemo da pisemo medjufaze u redisu 
        // relationResult = await neo4j.cypher(
        //     `match (o:Order {orderID : "${req.body.orderID}"})
        //     SET o.status = "${statusFlags.accepted}" return o`);

        // if (relationResult.records.length < 1) {
        //     throw new  Error("Couldn't create relation");
        // }
    
        res.send().status(200)

    }
    catch(e) { 
        res.status(500).send(e);
    }


}
const DeclineOrderRestaraunt =async (req,res) =>{ // push ka klijentu ,status u redisu se menja

    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}) SET o.status = "Declined" return o`).then(result => {

    res.send().status(200)
    })
    .catch(err => {
        res.status(500).send()
    })

}
const AcceptOrderDeliverer = async(req,res) =>{ //push ka klijentu , ka dostavljacima ide forced refresh, ukoliko je prihvacena vec vrati resepnce da jeste,status u redisu se menja
    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}),(d:Deliverer  {uuid: "${req.body.delivererID}"}) create (d)-[rel:DELIVERS]->(o) return d,o,rel`).then(result => {
    })
    .catch(err => console.log(err))

    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}) SET o.status = "Has a deliverer" return o`).then(result => {
    })
    .catch(err => console.log(err))

    res.send().status(200)
}
const OrderReady = async(req,res) =>{     //push ka dostavljacima, status u redisu se menja
    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}) SET o.status = "Ready" return o`).then(result => {

        res.send().status(200)
        })
        .catch(err => {
            res.status(500).send()
        })

    res.send().status(200)
}
const OrderPickedUp = async(req,res) =>{ //push ka klijentu, statu u redisu se menja
    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}) SET o.status = "Delivering" return o`).then(result => {

        res.send().status(200)
        })
        .catch(err => {
            res.status(500).send()
        })
    //salje se notificija dostavalja se  ?mozda i cet

}
const OrderFinished = async(req,res) => { //push ka klijentu, status u neo4j se menja
    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}) SET o.status = "Finished" return o`).then(result => {

        res.send().status(200)
        })
        .catch(err => {
            res.status(500).send()
        })
}



const GetPendingStore = (req,res) => {
    neo4j.cypher(`match (o:Order {status : "Pending"})-[r:CONTAINS]->(m:Meal)<-[rel:OFFERS]-(s:Store { uuid: "${req.params.storeID}"}) return DISTINCT o`).then(result => {
        //console.log(result);
        let orders = RecordsToJSON(result.records)
        res.send(orders).status(200)
    }).catch(err => console.log(err))
}
const GetAcceptedStore = (req,res) => {
    neo4j.cypher(`match (s:Store{uuid : "${req.params.storeID}"})-[rel:PREPARES]->(o:Order) WHERE  o.status = "Accepted" OR o.status = "Has a deliverer" return o`).then(result => {
        let orders = RecordsToJSON(result.records)
        res.send(orders).status(200)
    }).catch(err => console.log(err)) //samo za restoran restroan uuid parametar
}
const GetReadyStore = (req,res) => {
    neo4j.cypher(`match (s:Store{uuid : "${req.params.storeID}"})-[rel:PREPARES]->(o:Order {status : "Ready"}) return o`).then(result => {

        let orders = RecordsToJSON(result.records)
        res.send(orders).status(200)
    }).catch(err => console.log(err))//samo za restoran restroan uuid parametar
}
const GetAcceptedDeliverer = (req,res) => {
    neo4j.cypher(`match (s:Store{uuid : "${req.params.delivererID}"})-[rel:PREPARES]->(o:Order {status : "Has a deliverer"})(s:Store{uuid : "${req.params.delivererID}"}) return o`).then(result => {

        let orders = RecordsToJSON(result.records)
        res.send(orders).status(200)
    }).catch(err => console.log(err))
}


module.exports = {CreateOrder,AcceptOrderRestaraunt,GetAcceptedDeliverer,GetReadyStore,GetAcceptedStore,GetPendingStore,OrderFinished,OrderPickedUp,OrderReady,AcceptOrderDeliverer,DeclineOrderRestaraunt};