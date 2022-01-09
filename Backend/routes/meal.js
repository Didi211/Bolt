const express = require("express");
const router = express.Router()

const {CreateMeal, GetMealsByRestoraunt} = require('../controllers/mealController');


router.post('/create',CreateMeal); 
router.get('/get/:id',GetMealsByRestoraunt)

module.exports = router;