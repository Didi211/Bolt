const express = require("express");
const router = express.Router()

const {CreateCustomer, GetPreviousOrders} = require('../controllers/customerController');


router.post('/',CreateCustomer); 
router.get('/previousOrders/:id',GetPreviousOrders)
module.exports = router;