const express = require("express");
const router = express.Router()

const {CreateMeal, GetMealsByRestaurant, AddToCategory} = require('../controllers/mealController');


router.post('/create',CreateMeal); 
router.get('/get/restaurant/:id',GetMealsByRestaurant)
router.post('/addToCategory',AddToCategory)

module.exports = router;