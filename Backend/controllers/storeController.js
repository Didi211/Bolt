const  neo4j  = require('../config/neo4j_config');
const restoran = require('../models/storeModel');
const token = require('../config/token')
const bcrypt = require('bcrypt');
const e = require('express');

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

const GetTop5 = async (req,res) => { 
    let allStores = await neo4j.model('Store').all()
    // console.log("ALL STORES")
    // console.log(allStores)
    let temp = []
    await allStores.forEach(async (store) => { 
        
        let stored_uuid = store._properties.get('uuid')
        let result = await neo4j.cypher(
            `MATCH (s:Store {uuid: '${stored_uuid}'})-[rel:PREPARES]->(o:Order) return count(rel)`
        );
    
        result.records.forEach(element => {
            let relCount = element._fields[0].low
            
            temp.push({
                key: stored_uuid,
                value: relCount
            })
            console.log(temp);
        })
    });
    temp.sort()
    
    console.log("nasdasm l");
    console.log(temp)
    res.status(200).send("")
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

const changePrepTime = async (req,res) => { 
    try 
    { 
        let uuid = req.params.id
        let storeDb = await neo4j.model('Store').find(uuid)
        await storeDb.update({preptime: req.body.preptime})
        res.status(200).send("")
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

module.exports = {
    CreateStore,
    GetStore,
    GetAllStores,
    changePrepTime,
    GetTop5
}