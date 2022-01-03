const express = require("express")
const router = express.Router()

const CreateRestoran = require('../controllers/storeController')

router.post('/', CreateRestoran)

module.exports = router