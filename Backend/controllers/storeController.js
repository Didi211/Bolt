const  neo4j  = require('../config/neo4j_config');
const restoran = require('../models/storeModel');
const token = require('../config/token')
const bcrypt = require('bcrypt');

const saltRounds = 10;

function convertToDTO(store) { 
   
    let storeDTO = {
        uuid: store._properties.get('uuid'),
        username: store._properties.get('username'),
        name: store._properties.get('name'),
        location: store._properties.get('location'),
        preptime: store._properties.get('preptime')
    }
    return storeDTO
  
   
}
const CreateStore = async (req,res) => { 
    
    
    bcrypt.hash(req.body.password, saltRounds).then(hash => {

        neo4j.model("Store").create({
            username: req.body.username,
            password: hash,
            name: req.body.name,
            location: req.body.location,
            preptime: req.body.preptime,
            role: "Store"// Simple schema definition of property : type
        
        }).then(store => {

            let user = {
                username : store._properties.get("username"),
                uuid :store._properties.get("uuid"),
                role :store._properties.get("role")
            }
            webtoken = token.generateAccessToken(user)
            res.send({user,webtoken}).status(200)  

        }).catch(err => res.status(400).send(err))

    }).catch(err => res.status(500).send(err))
    
}

const GetStore = async (req,res) => {

    let uuid = req.params.id
    try { 
        let store = await neo4j.model('Store').find(uuid)
        let storeDTO = convertToDTO(store)
        res.status(200).send(storeDTO)
    }
    catch(e) { 
        res.status(500).end(e.message || e.toString())
    }

    

}

const GetAllStores = async (req,res) => { 
    try { 
        let stores = await neo4j.model('Store').all()
        let storesDTO = []
        stores.forEach(element => {
            storesDTO.push(convertToDTO(element))
        });
        res.status(200).send(storesDTO)
    }
    catch(e) { 
        res.status(500).end(e.message || e.toString())
    }
}


module.exports = {CreateStore, GetStore, GetAllStores}