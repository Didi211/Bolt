
const neo4j = require('../config/neo4j_config');
const user = require('../models/userModel');

const CreateUser = (req,res) => {    
    neo4j.model("User").create({
        
        username: 'jamhol',
        password: 'password', // Simple schema definition of property : type
    
    }).then(user => {
       res.send(user).status(200);

    }).catch(err => res.send(err).status(400));
}

module.exports = {CreateUser};