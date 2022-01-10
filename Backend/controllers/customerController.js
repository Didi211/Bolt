
const neo4j = require('../config/neo4j_config');
const customer = require('../models/customerModel');
const token = require('../config/token')
const bcrypt = require('bcrypt');

const saltRounds = 10;

const RecordsToJSON = (records) =>{
    let item= []    
    records.forEach(element => {       
        item.push(element._fields[0].properties)
    })
    return item
} 

const CreateCustomer = async (req,res) => {  

    bcrypt.hash(req.body.password, saltRounds).then(hash => {

        neo4j.model("Customer").create({
            name: req.body.name,  
            surname: req.body.surname,
            location: req.body.location,
            username: req.body.username,
            password: hash,
            role: "Customer"// Simple schema definition of property : type
        
        }).then(customer => {

            let user = {
                username : customer._properties.get("username"),
                uuid :customer._properties.get("uuid"),
                role :customer._properties.get("role")
            }
            webtoken = token.generateAccessToken(user)
            res.send({user,webtoken}).status(200)  

        }).catch(err => res.status(400).send(err))

    }).catch(err => res.status(500).send(err))
}

const GetCustomerByUsername = (req) => {
    neo4j.find('Customer', {username : req.body.username}).then(customer => {
        return customer
    }).catch(err => {console.log(err); return "ERROR!"})
}


const GetCustomer = (req,res) => {
    neo4j.find('Customer',req.params.id).then(user => {
        userDTO = {
            name: user._properties.get('name'),
            surname: user._properties.get('surname'),
            username: user._properties.get('username'),
            uuid: user._properties.get('uuid'),
            location: user._properties.get('location') 
        }
        res.send(userDTO).status(200)
    }).catch(err => res.send(err).status(400))
}
const GetPreviousOrders = async (req,res) => {
    let result = await neo4j.cypher(`match (c:Customer {uuid : "${req.params.id}"})-[rel:ORDERED]->(o:Order {status: "Finished"}) return o`)
    let orders = RecordsToJSON(result.records)
    let ordersWithMeals = []
    for await (let order of orders) { 
        let result = await neo4j.cypher(`match (m:Meal)<-[:CONTAINS]-(o:Order { orderID: '${order.orderID}'}) return m`)
        let meals = RecordsToJSON(result.records)
        ordersWithMeals.push({order: order, meals: meals})
        // console.log("Meal:",meals);

    }
    // console.log("OrdersMeals",ordersWithMeals[0].meals);
    res.send(ordersWithMeals).status(200)
    
}

const ChangeLocation = async (req,res) => { 
    try { 
        let customer = await neo4j.model('Customer').find(req.params.id)
        if (!customer) {
            res.status(400).send("Customer not found")
            return
        }
        customer.update({location: req.body.location})
        res.status(200).send("")
    }
    catch(e) { 
        res.status(500).send(e)
    }
}
module.exports = {
    CreateCustomer,
    GetCustomer,
    GetCustomerByUsername,
    GetPreviousOrders,
    ChangeLocation
};