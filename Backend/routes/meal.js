const express = require("express");
const router = express.Router()

const {CreateMeal, GetMealsByRestaurant, AddToCategory,GetMealById} = require('../controllers/mealController');


router.post('/create',CreateMeal); 
router.get('/get/restaurant/:id',GetMealsByRestaurant)
router.post('/addToCategory',AddToCategory)
router.get('/get/:id',GetMealById)

module.exports = router;