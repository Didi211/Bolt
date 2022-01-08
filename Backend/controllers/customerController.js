
const neo4j = require('../config/neo4j_config');
const customer = require('../models/customerModel');
const token = require('../config/token')
const bcrypt = require('bcrypt');
const nodemon = require('nodemon');
const saltRounds = 10;


const CreateCustomer = async (req,res) => {  
    console.log(req) 
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

        }).catch(err => res.send(err).status(400))

    }).catch(err => res.send(err).status(500))
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

module.exports = {CreateCustomer,GetCustomer,GetCustomerByUsername};