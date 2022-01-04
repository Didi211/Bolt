
const neo4j = require('../config/neo4j_config');
const customer = require('../models/customerModel');

const CreateCustomer = (req,res) => {    
    neo4j.model("Customer").create({
        name: 'Customer',  
        surname: 'Customer',
        location: 'Mose Pijade 21',
        username: 'cust29',
        password: 'password' // Simple schema definition of property : type
    
    }).then(customer => {
       res.send(customer).status(200);

    }).catch(err => res.send(err).status(400));
}

module.exports = {CreateCustomer};