
const { status } = require('express/lib/response');
const neo4j = require('../config/neo4j_config');
const customer = require('../models/orderModel');
const { GetMealPrice } = require('./mealController');

const CreateOrder =  (req,res) => {       
    let price = 0
    req.body.meals.forEach(async (element) => {    
        price =+ await GetMealPrice(element)    
        
    });
    
    neo4j.model("Order").create({
        price: price,  
        timeWaiting: req.body.timeWaiting,
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
const AcceptOrderRestaraunt = (req,res) =>{
    req.body.oredID
    status: "Accepted"

}
const DeclineOrderRestaraunt = (req,res) =>{
    req.body.oredID
    status: "Declined"

}
const AcceptOrderDeliverer = (req,res) =>{ //redis resotorn dostavljac otvara se
    req.body.oredID
    status: "Has a deliverer"

}
const OrderReady = (req,res) =>{     //ide preko redisa
    req.body.oredID
    status: "Ready"

}

const OrderPickedUp = (req,res) =>{ //redis deliverer korisnik otvra se ,  resotorn dostavljac zatvara se 
    req.body.oredID
    status: "Delivering"

    //salje se notificija dostavalja se  ?mozda i cet

}
const OrderFinished = (req,res) => { //redis deliverer korisnik zatvara se
    req.body.oredID
    status: "Finished"
}

const GetPendingStore = (req,res) => { //samo za restoran restroan uuid parametar
}
const GetAcceptedStore = (req,res) => { //samo za restoran restroan uuid parametar
}
const GetReadyStore = (req,res) => { //samo za restoran restroan uuid parametar
}
const GetAcceptedDeliverer = (req,res) => { // za dostavaljace

}


/**
 * const getNewOrders(role)
 */

/**
 * const chooseOrder(role,orderID)
 */

/**
 * const finishOrder(role,orderID)
 */

module.exports = {CreateOrder};