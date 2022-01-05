const neo4j = require('../config/neo4j_config');

neo4j.model('Order',{
    // meals: { zar ovo nije veza sa jelima? 
    //     type: 
    // }
    // customer nekako treba da zapamtimo ko porucuje
    // store i nekako treba da zapamtimo iz kog restorana
    price: {
        type: 'number',
        required: true,
        
    },
    timeWaiting: {
        type: 'number', //jel cemo ovo da pamtimo kao 35 minuta? tj sve u minute? string ili int?
        required: true
    },
    onAddress: { 
        type: 'string',
        required: true,
    },
    note: {
        type: 'string'
    }
    //veza sa jelima CONTAINS_MEAL
});
