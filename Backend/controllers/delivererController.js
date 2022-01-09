
const neo4j = require('../config/neo4j_config');
const deliverer = require('../models/delivererModel');
const token = require('../config/token')
const bcrypt = require('bcrypt');

const saltRounds = 10;
const CreateDeliverer = (req,res) => {
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
            neo4j.model("Deliverer").create({
            name: req.body.name,  
            surname: req.body.surname,
            vehicle: req.body.vehicle,
            username: req.body.username,
            password: hash,
            role: "Deliverer"// Simple schema definition of property : type
        
        }).then(deliverer => {

            let user = {
                username : deliverer._properties.get("username"),
                uuid :deliverer._properties.get("uuid"),
                role :deliverer._properties.get("role")
            }
            webtoken = token.generateAccessToken(user)
            res.send({user,webtoken}).status(200)  

        }).catch(err => res.status(400).send(err))

    }).catch(err => res.status(500).send(err))
    
}



module.exports = {CreateDeliverer};