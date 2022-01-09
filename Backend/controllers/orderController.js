
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