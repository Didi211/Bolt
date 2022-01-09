
const neo4j = require('../config/neo4j_config');
const meal = require('../models/mealModel');

const RecordsToJSON = (records) =>{
    let item= []    
    records.forEach(element => {
        console.log(element._fields[0].properties);
        item.push(element._fields[0].properties)
    })
    return item
} 
const CreateMeal = (req,res) => {    
    const mealBody = req.body    
    neo4j.model("Meal").create({
        name: mealBody.name,
        price: mealBody.price,
        category: mealBody.category,
        servingSize: mealBody.servingSize
    }).then(meal => {    
        
            
            neo4j.cypher(`match (m:Meal {mealID: "${meal._properties.get("mealID")}"}),(store:Store {uuid: "${req.body.storeID}"}) create (store)-[rel:OFFERS]->(m) return m,store,rel`)
            .then(result => {                 
            })
            .catch(err => console.log(err)          )
       
        res.send(meal).status(200)
            
        })        
    .catch(err => res.send(err).status(400));
}
const GetMealsByRestaurant = (req,res) => {
    neo4j.cypher(`match (store:Store {uuid : "${req.params.id}"})-[rel:OFFERS]->(meal:Meal) return meal`).then(result => {
        //console.log(result);
        let meals = RecordsToJSON(result.records)
    
        res.send(meals).status(200)
    }).catch(err => console.log(err))
}

const GetMealById = async(req,res) =>{
    let mealID = req.params.id
    try { 
        let Meal = await neo4j.model('Meal').find(mealID)
        let meal = {
            name : Meal._properties.get("name"),
            price :Meal._properties.get("price"),            
        }
        res.status(200).send(meal)
    }
    catch(e) { 
        res.status(500).end(e.message || e.toString())
    }
}
const GetMealPrice = async(id) =>{
    
    try { 
        let Meal = await neo4j.model('Meal').find(id)
        let meal = {
            name : Meal._properties.get("name"),
            price :Meal._properties.get("price"),            
        }
        return meal.price
    }
    catch(e) { 
        res.status(500).end(e.message || e.toString())
    }
}
const AddToCategory = (req,res) => {
    neo4j.cypher(`match (m:Meal {mealID: "${req.body.mealID}"}),(c:Category {name: "${req.body.categoryName}"}) create (m)-[rel:BELONGS_TO]->(c) return m,c,rel`)
            .then(result => {  
                console.log(result);
                if(result.records == [])
                    res.send(400) //error handle ne radi
                res.send(result).status(200)         
                
            })
            .catch(err => {res.status(400).send(result)})
}

module.exports = {CreateMeal,GetMealsByRestaurant,GetMealById,GetMealPrice,AddToCategory};