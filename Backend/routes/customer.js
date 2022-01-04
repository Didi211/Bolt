const express = require("express");
const router = express.Router()

const {CreateCustomer} = require('../controllers/customerController');


router.post('/',CreateCustomer); 

module.exports = router;