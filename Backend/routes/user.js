const express = require("express")
const router = express.Router()

const {CreateUser} = require('../controllers/userController')


router.post('/',CreateUser)   

module.exports = router