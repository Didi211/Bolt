
const neo4j = require('../config/neo4j_config');
const redis_client = require('../config/redis_config');
const category = require('../models/categoryModel');


const CreateCategory = async (req,res) => { 
    let categoryBody = req.body   
    try { 
        let category = await neo4j.model("Category").mergeOn({
            name: categoryBody.name
        })
        let categoryDTO = { 
            name: category._properties.get('name')
        }
        res.status(200).send(categoryDTO)
    }
    catch(e) { 
        res.status(400).end(e.message || e.toString())
    }
    
}

const DeleteCategory = async (req,res) => { 
    let categoryBody = req.body   
    try { 
        let category = await neo4j.model("Category").find(categoryBody.name)
        if (!category) {
            return res.status(400).send("Object not found.")
        }
        category.delete()
        res.status(200).send("")
    }
    catch(e) { 
        res.status(400).end(e.message || e.toString())
    }
}



const GetAllCategories = async (req,res) =>  { 
    
    try {     
                   
        redisData = await redis_client.get('categories')
        if(redisData != null)
            res.status(200).send(JSON.parse(redisData))
        else {           
            let categories = await neo4j.model("Category").all()
            let categoriesDTO = []
            categories.forEach(element => {
                console.log(element)
                let elementDTO = { 
                    name: element._properties.get('name')
                }
                categoriesDTO.push(elementDTO)
                
            })
            redis_client.setEx('categories', 600,JSON.stringify(categoriesDTO))
            res.status(200).send(categoriesDTO)
        }    
    }catch(e) {         
        res.status(500).send(e.message || e.toString())
    }
}
module.exports = {CreateCategory, DeleteCategory, GetAllCategories};