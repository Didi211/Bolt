
const neo4j = require('../config/neo4j_config');
const meal = require('../models/mealModel');

const CreateMeal = (req,res) => {    
    const mealBody = req.body    
    neo4j.model("Meal").create({
        name: mealBody.name,
        price: mealBody.price,
        category: mealBody.category,
        servingSize: mealBody.servingSize
    }).then(meal => {    
        mealBody.ingredients.forEach(ingr => {                        
            neo4j.cypher(`match (m:Meal {mealID: "${meal._properties.mealID}"}),(ing:Ingredient {name: "${ingr}"}) create (m)-[rel:CONTAINS]->(ing) return m,ing,rel`)
            .then(result => {                 
            }).catch(err => console.log(err))
        })
        res.send(meal).status(200)
            
        })        
    .catch(err => res.send(err).status(400));
}

module.exports = {CreateMeal};