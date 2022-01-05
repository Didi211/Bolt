
const neo4j = require('../config/neo4j_config');
const ingredient = require('../models/ingredientModel');

const CreateIngredient = (req,res) => {    
    neo4j.model("Ingredient").create({
        name: 'Chicken breasts',  
    
    }).then(ingredient => {
       res.send(ingredient).status(200);

    }).catch(err => res.send(err).status(400));
}

module.exports = {CreateIngredient};