const neo4j = require('../config/neo4j_config');

neo4j.extend('User','Deliverer',{
    name: {
        type: 'string'
    },
    surname: { 
        type: 'string'
    },
    vehicle: {
        type: 'string'
    },
   
});

