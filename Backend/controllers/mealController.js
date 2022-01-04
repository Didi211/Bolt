
const neo4j = require('../config/neo4j_config');
const meal = require('../models/mealModel');

const CreateMeal = (req,res) => {    
    neo4j.model("Meal").create({
        name: "Chicken wrap",
        ingredients: "piletina, zelena, paradajz, senf, tortilja",
        price: 350,
        category: "Wrap",
        servingSize: 450

    }).then(meal => {
       res.send(meal).status(200);

    }).catch(err => res.send(err).status(400));
}

module.exports = {CreateMeal};