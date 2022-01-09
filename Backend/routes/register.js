const express = require('express')
const router = express.Router()

const { CreateCustomer } = require('../controllers/customerController');
const { CreateDeliverer } = require('../controllers/delivererController');



router.post('/customer',CreateCustomer)     
 router.post('/deliverer',CreateDeliverer)

module.exports = router