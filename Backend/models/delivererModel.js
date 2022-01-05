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
    picks_up: { 
        type: 'relationship',
        target: 'Order',
        relationship: 'PICKS_UP',
        direction: "out",
        properties: {
            timePicked: "localtime"
        }

    }
});

