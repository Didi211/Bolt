
const neo4j = require('../config/neo4j_config');
const ingredient = require('../models/ingredientModel');

const AddIngredient = (req,res) => { 
    ingr = req.body   
    neo4j.model("Ingredient").create({
        name: ingr.name

    
    }).then(ingredient => {
       res.send(ingredient).status(200);

    }).catch(err => res.send(err).status(400));
}

module.exports = {AddIngredient};