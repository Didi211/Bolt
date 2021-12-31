
const  neo4j  = require('../config/neo4j_config');
const user = require('../models/userModel')

console.log(neo4j);
const CreateUser = (req,res) => {    
    neo4j.model("User").create({
        name: 'James',  
        surname: 'Holand',
        username: 'jamhol',
        // password: 'string', // Simple schema definition of property : type
        // location: 'string'
    
    }).then(user => {
       res.send(user).status(200)

    }).catch(err => res.send(err).status(400))
}

module.exports = {CreateUser}