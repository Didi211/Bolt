const express = require("express");
const router = express.Router()

const {CreateCustomer,
    GetPreviousOrders,
    ChangeLocation,
    GetCustomer,GetCustomerByUsername} = require('../controllers/customerController');


router.post('/',CreateCustomer); 
router.get('/previousOrders/:id',GetPreviousOrders)
router.put('/changeLocation/:id',ChangeLocation)
router.get('/get/:id',GetCustomer)

router.get('/get/username/:id',GetCustomerByUsername)
module.exports = router;