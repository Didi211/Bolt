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
        //ako ovo bude u gramima, moze u vezi sa sastojcima da se naznaci 
        //koji se sastojak koliko nalazi u obroku i da ovo bude suma toga
        type: 'number' //u gramima ili mozda bude string 
    },
    
}); 