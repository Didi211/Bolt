const express = require("express");
const router = express.Router()

const {CreateOrder} = require('../controllers/orderController');


router.post('/',CreateOrder); 

module.exports = router;