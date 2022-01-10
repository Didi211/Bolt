const express = require("express");
const router = express.Router()

const {CreateCustomer,
    GetPreviousOrders,
    ChangeLocation} = require('../controllers/customerController');


router.post('/',CreateCustomer); 
router.get('/previousOrders/:id',GetPreviousOrders)
router.put('/changeLocation/:id',ChangeLocation)
module.exports = router;