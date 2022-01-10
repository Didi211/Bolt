
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
    neo4j.findById('Customer',req.body.uuid).then(user => {
        res.send(user).status(200)
    }).catch(err => res.send(err).status(400))
}
const GetPreviousOrders = (req,res) => {
    neo4j.cypher(`match (c:Customer {uuid : "${req.params.id}"})-[rel:ORDERED]->(o:Order {status: "Finished"}) return o`).then(result => {
        console.log(result);
        orders = RecordsToJSON(result.records)
        
        res.send(orders).status(200)
    }).catch(err => console.log(err))
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