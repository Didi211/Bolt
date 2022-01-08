const express = require("express");
const router = express.Router()

const {CreateMeal} = require('../controllers/mealController');


router.post('/create',CreateMeal); 

module.exports = router;