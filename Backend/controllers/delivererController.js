
const neo4j = require('../config/neo4j_config');
const deliverer = require('../models/delivererModel');

const CreateDeliverer = (req,res) => {
    neo4j.model('Deliverer').create({
        name: "Vojislav",
        surname: "Ilic",
        vehicle: "Car",
        username: "vojaIlic",
        password: "vojavoja"
    }).then(deliverer => {
        res.send(deliverer).status(200);
    }).catch(err => res.send(err).status(400));
}

module.exports = CreateDeliverer;