
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

// const CreateFoodOrder = (req,res) => {
//     Promise.all([
//         neo4j.model('Customer').create({
//             name: 'Dimitrije',
//             surname: 'Mitic',
//             location: 'Dragise Cvetkovica 22/12',
//             username: 'miticd99',
//             password: 'didididi'

//         }),
//         neo4j.model('Order').create({
            

//         })
//     ]).then(([customer,order]) => { 
//         customer.relateTo(order,'creates_order',{date: new Date().now(), time: new Date().now() })
//             .then(res => {
//                 console.log('Order created.');
//             })
//     }) 
// }
module.exports = {CreateCustomer};