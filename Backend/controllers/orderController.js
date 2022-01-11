
const { status } = require('express/lib/response');
const neo4j = require('../config/neo4j_config');
const customer = require('../models/orderModel');
const { GetMealPrice } = require('./mealController');
const redis_client = require('../config/ws.config')

redis_client.set('name','bilo sta')


const RecordsToJSON = (records) =>{
    let item= []    
    records.forEach(element => {        
        item.push(element._fields[0].properties)
    })
    return item
} 

const CreateOrder =  (req,res) => { //push ka restoranu, kreira se u redis i neo4j bazama      
    let price = 0
    req.body.meals.forEach(async (element) => {    
        price =+ await GetMealPrice(element)    
        
    });
    console.log(req.body.tralala)
    neo4j.model("Order").create({
        
        price: price,  
        onAddress: req.body.onAddress,
        note: req.body.note,
        status: "Pending"
    
    }).then(order => {
        neo4j.cypher(`match (c:Customer {uuid : "${req.body.uuid}"}),(o:Order  {orderID: "${order._properties.get("orderID")}"}) create (c)-[rel:ORDERED]->(o) return c,o,rel`).then(result => {   
                         
        })
        .catch(err => console.log(err))
        req.body.meals.forEach(element => {
            neo4j.cypher(`match (o:Order {orderID : "${order._properties.get("orderID")}"}),(m:Meal  {mealID: "${element}"}) create (o)-[rel:CONTAINS]->(m) return o,m,rel`).then(result => {                
            })
            .catch(err => console.log(err))
        });
        
        res.send(order).status(200);

    }).catch(err => res.send(err).status(400));
}
const AcceptOrderRestaraunt = async (req,res) =>{  // push ka klijentu i ka dostavljacima, status u redisu se menja  

    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}),(s:Store  {uuid: "${req.body.storeID}"}) create (s)-[rel:PREPARES]->(o) return s,o,rel`).then(result => {                
    })
    .catch(err => console.log(err))
     
    neo4j.cypher(`match (o:Order {orderID : "${req.body.orderID}"}) SET o.status = "Accepted" return o`).then(result => {                
    })
    .catch(err => console.log(err))   


    res.send().status(200)
    

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