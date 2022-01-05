const neo4j = require('../config/neo4j_config');

neo4j.extend('User','Store',{
    name: {
        type: 'string',
        required: true
    },
    location: { 
        type: 'string',
        required: true,
        unique: true
    },
    cooks: {
        type: 'relationship',
        target: 'Meal',
        relationship: 'COOKS',
        direction: 'out',
        properties: {
            time: {
                type: 'number',
                required: true
            }
            //odeljak??? 
        }
    }
    //veza sa meal 'COOKS', cooks veza ima property odeljak naziv 
});