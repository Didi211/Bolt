
const neo4j = require('../config/neo4j_config');
const meal = require('../models/mealModel');


const RecordsToJSON = (records) =>{
    let item= []    
    records.forEach(element => {        
        item.push(element._fields[0].properties)
    })
    return item
} 


const MealsToJSON = (records) =>{
    let item= []    
    records.forEach(element => {
        let added = false
        item.forEach(e => {
            if (e.section == element._fields[0].properties.category){
                e.meals.push(element._fields[0].properties)   
                added = true    
            }               
        })
        if (added == false)
            item.push({section:element._fields[0].properties.category,meals:[element._fields[0].properties]})
    })
    return item
} 
const CreateMeal = (req,res) => {    
    const mealBody = req.body    
    neo4j.model("Meal").create({
        name: mealBody.name,
        price: mealBody.price,
        category: mealBody.category,
        servingSize: mealBody.servingSize,
        ingredients: mealBody.ingredients,
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
        let meals = MealsToJSON(result.records)
    
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
const AddToCategory = async (req,res) => {
    let meal = await neo4j.model('Meal').find(req.body.mealID)
    if (!meal) {
        res.status(400).send("Meal not found!")
        return
    }
    let category = await neo4j.model('Category').first('name',req.body.categoryName)
    if (!category) {
        res.status(400).send("Category not found!")
        return
    }
    neo4j.cypher(`match (m:Meal {mealID: "${req.body.mealID}"}),(c:Category {name: "${req.body.categoryName}"}) create (m)-[rel:BELONGS_TO]->(c) return m,c,rel`)
            .then(result => {  
                console.log(result);
                if(result.records.length === 0) //error handle za ovo je obradjen iznad 
                    res.send(400) //error handle ne radi 
                res.send(result).status(200)         
                
            })
            .catch(err => {res.status(400).send(result)})
}
const DeleteMeal = (req,res) => {
  
    neo4j.cypher(`match (m:Meal {mealID : "${req.params.id}"})-[rel:BELONGS_TO]->(c:Category}) delete rel`).then(result => {
        
        neo4j.cypher(`match (m:Meal {mealID : "${req.params.id}"})<-[rel:BELONGS_TO]-(o:Order) delete rel,m`).then(result => {
            res.send().status(200)
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

const GetCategory = (req,res) =>{
    neo4j.cypher(`match (m:Meal {mealID : "${req.params.id}"})-[rel:BELONGS_TO]->(c:Category) return c`).then(result => {
        //console.log(result);
        let meals = RecordsToJSON(result.records)
    
        res.send(meals).status(200)
    }).catch(err => console.log(err))
}


module.exports = {CreateMeal,DeleteMeal,GetMealsByRestaurant,GetMealById,GetMealPrice,AddToCategory,GetCategory};