
const neo4j = require('../config/neo4j_config');
const customer = require('../models/orderModel');

const CreateOrder = (req,res) => {    
    neo4j.model("Order").create({
        price: 350,
        timeWaiting: 35,
        onAddress: "Mose Pijade 21",
        note: "Zvoni da sidjem ispred zgrade da se ne penjes."

    
    }).then(order => {
       res.send(order).status(200);

    }).catch(err => res.send(err).status(400));
}

module.exports = {CreateOrder};