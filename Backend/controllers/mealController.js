
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
        
            console.log(meal._properties.get("mealID"));
            neo4j.cypher(`match (m:Meal {mealID: "${meal._properties.get("mealID")}"}),(store:Store {uuid: "${req.body.storeID}"}) create (store)-[rel:OFFERS]->(m) return m,store,rel`)
            .then(result => {                 
            }).catch(err => {console.log(err)            })
       
        res.send(meal).status(200)
            
        })        
    .catch(err => res.send(err).status(400));
}
const GetMealsByRestoraunt = (req,res) => {
    neo4j.cypher(`match (store:Store {uuid : ${req.params.id}})-[rel:OFFERS]->(meal:Meal) return meal`).then(result => {
        res.send(result).status(200)
    }).catch(err => console.log(err))
}

module.exports = {CreateMeal,GetMealsByRestoraunt};