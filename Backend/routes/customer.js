const express = require("express");
const router = express.Router()

const {CreateCustomer,
    GetPreviousOrders,
    ChangeLocation,
    GetCustomer} = require('../controllers/customerController');


router.post('/',CreateCustomer); 
router.get('/previousOrders/:id',GetPreviousOrders)
router.put('/changeLocation/:id',ChangeLocation)
router.get('/get/:id',GetCustomer)
module.exports = router;