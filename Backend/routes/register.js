const express = require('express')
const router = express.Router()

const { CreateCustomer } = require('../controllers/customerController');
const token = require('../config/token')

const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/customer',CreateCustomer)     

module.exports = router