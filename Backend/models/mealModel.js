const neo4j = require('../config/neo4j_config');

neo4j.model('Meal',{ 
    mealD: {
        primary: true,
        unique: true,
        type: 'uuid'
    },
    name: { 
        type: 'string',
        required: true,
    },
    price: {
        type: 'number',
        required: true
    },
    category: {
        type: 'string',
        required: true
    },
    servingSize: {
        type: 'number' //u gramima ili mozda bude string 
    },
    contains_ingredient: {
        type: 'relationship',
        target: 'Ingredient',
        relationship: 'CONTAINS_INGREDIENT',
        direction: 'out',
        eager: true
    }
    //treba veza sa ingredient 'CONTAINS_INGREDIENT'
}); 