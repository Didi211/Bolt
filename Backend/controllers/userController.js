
const  instance  = require('../config/dbconfig');
const user = require('../models/userModel')

console.log(instance);
const CreateUser = (req,res) => {    
    instance.model("User").create({
        name: 'Adam',  
        surname: 'Sandler',
        username: 'ASandler',
        password: 'string', // Simple schema definition of property : type
        location: 'string'
    
    }).then(user => {
       res.send(user).status(200)

    }).catch(err => res.send(err).status(400))
}

module.exports = {CreateUser}