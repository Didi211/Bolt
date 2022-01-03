const  neo4j  = require('../config/neo4j_config')
const restoran = require('../models/storeModel')

const CreateStore = (req,res) => { 
    neo4j.model("Store").create({
        username: 'tortiljaBarZabac',
        password: 'tortiljaBarZabac',
        name: 'test',
        location: 'test'
    }).then(store => { 
        res.send(store).status(200)
    }).catch(err => res.send(err).status(400))
}

module.exports = CreateStore