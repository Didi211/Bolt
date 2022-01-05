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
    },
    contains_meal: {
        type: 'relationship',
        target: 'Meal',
        relationship: 'CONTAINS_MEAL',
        direction: 'out',
        properties: {
            amount: { //ako ovo ne pali onda cu van ove funkcije da deifinisem veze
                type: 'number',
                required: true
            },
        },
        eager: true // kada se otvore moje porudzbine da mi prikazuje sta sam porucio u toj porudzbini 
    },
    for_store: {
        type: 'relationship',
        target: 'Store',
        direction: 'out',
        eager: true // kada se otvore moje porudzbine da mi prikazuje koja je radnja u pitanju
    }
});
