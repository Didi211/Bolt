
const neo4j = require('../config/neo4j_config');
const meal = require('../models/mealModel');

const CreateMeal = (req,res) => {    
    const mealBody = req.body
    console.log(mealBody)
    neo4j.model("Meal").create({
        name: mealBody.name,
        price: mealBody.price,
        category: mealBody.category,
        servingSize: mealBody.servingSize

    }).then(meal => {
        ingredients = []
        mealBody.ingredients.forEach(ingr => {
            console.log(ingr)
            
            neo4j.cypher('MATCH (ing:Ingredient {name: $name}) return ing',{name: ingr})
            .then(result => { 
                result.records.forEach(element => {
                    ingr = element._fields[0]
                    console.log(ingr)
                    ingredients.push(result);
                });
            });
        }); 
        ingredients.forEach(ingr => {
            meal.relateTo(ingr,'CONTAINS');
        });
        res.send(meal).status(200);
    }).catch(err => res.send(err).status(400));
}

module.exports = {CreateMeal};