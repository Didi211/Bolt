const express = require("express");
const router = express.Router()

const {CreateIngredient} = require('../controllers/ingredientController');


router.post('/',CreateIngredient); 

module.exports = router;