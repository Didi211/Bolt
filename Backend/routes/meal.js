const express = require("express");
const router = express.Router()

const {CreateMeal} = require('../controllers/mealController');


router.post('/',CreateMeal); 

module.exports = router;