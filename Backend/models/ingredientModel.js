const  neo4j  = require('../config/neo4j_config');

neo4j.model('Ingredient', {
    name: { 
        type: 'string',
        required: true
    }

});