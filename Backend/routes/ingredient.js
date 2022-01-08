const express = require("express");
const router = express.Router()

const {AddIngredient} = require('../controllers/ingredientController');


router.post('/add',AddIngredient); 

module.exports = router;