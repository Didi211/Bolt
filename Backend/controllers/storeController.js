const  neo4j  = require('../config/neo4j_config');
const restoran = require('../models/storeModel');

function convertToDTO(store) { 
   
    let storeDTO = {
        username: store._properties.get('username'),
        password: store._properties.get('password'),
        name: store._properties.get('name'),
        location: store._properties.get('location')
    }
    return storeDTO
  
   
}
const CreateStore = async (req,res) => { 
    const storeBody = req.body;
    try { 
        store = await neo4j.model("Store").create({
            username: storeBody.username,
            password: storeBody.password,
            name: storeBody.name,
            location: storeBody.location
        })
        let storeDTO = convertToDTO(store)
    
        res.status(200).send(storeDTO)

    }
    catch(e) { 
        res.status(500).end(e.message || e.toString())
    }
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

module.exports = {CreateStore, GetStore, GetAllStores};