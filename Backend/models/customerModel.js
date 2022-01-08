const  neo4j  = require('../config/neo4j_config');


neo4j.extend('User','Customer',{
    name: {
        type: 'string'
    },
    surname: {
        type: 'string'
    },
    location: {
        type: 'string',
        unique: true
    },
   
    
});