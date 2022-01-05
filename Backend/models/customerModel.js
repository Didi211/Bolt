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
    ordered: { 
        type: 'relationship',
        target: 'Order',
        relationship: 'ORDERED',
        direction: 'out',
        eager: 'true' //kada se otvori porudzbina da se prikazu njeni podaci
       
    }
    //treba veza sa order 'Porucio' ili 'ORDERED'
});