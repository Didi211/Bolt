/**
 * fajl namenjen za kreiranje veza, kako ne bi bile razbacane na vise mesta i time doslo do nepoklapanja podataka
 * nisam siguran ali mislim da je potrebno definisati vezu sa obe strane kao na primeru:
 * 
 * instance.model('Director').relationship('directed', 'DIRECTED', 'out', 'Movie', {
        since: {
            type: 'number',
            required: true,
        }
    });
    instance.model('Movie').relationship('director', 'DIRECTED', 'in', 'Director', {
        since: {
            type: 'number',
            required: true,
        }
    });
 */
const  neo4j  = require('../config/neo4j_config');

//veza  ORDERED [Customer, Order]
// ordered: { 
//     type: 'relationship',
//     target: 'Order',
//     relationship: 'ORDERED',
//     direction: 'out',
//     eager: 'true' //kada se otvori porudzbina da se prikazu njeni podaci
// }
neo4j.model('Customer').relationship('creates_order','CREATES_ORDER','creates_order','direction_out','Order',{
    date: {
        type: 'localdate',
        required: true
    },
    time: {
        type: 'localtime',
        required: true
    },
    eager: true,
    cascade: 'detach'
});
neo4j.model('Order').relationship('receives_order','CREATES_ORDER','receives_order','direction_in','Customer',{
    date: {
        type: 'localdate',
        required: true
    },
    time: {
        type: 'localtime',
        required: true
    },
    eager: true,
    cascade: 'delete'

})


//veza HAS_MEALS [Order, Meal]
// contains_meal: {
//     type: 'relationship',
//     target: 'Meal',
//     relationship: 'CONTAINS_MEAL',
//     direction: 'out',
//     properties: {
//         amount: { //ako ovo ne pali onda cu van ove funkcije da deifinisem veze
//             type: 'number',
//             required: true
//         },
//     },
//     eager: true // kada se otvore moje porudzbine da mi prikazuje sta sam porucio u toj porudzbini 
// },
neo4j.model('Order').relationship('has_meals','HAS_MEALS','has_meals','direction_out','Meal',{
    amount: {
        type: 'number',
        required: true
    },
    eager: true,
    cascade: 'detach'
})
neo4j.model('Meal').relationship('belongs_to','HAS_MEALS','belongs_to','direction_in','Order',{
    amount: {
        type: 'number',
        required: true
    },
    eager: true,
    'cascade': 'detach'
})

//veza FOR_STORE [Order, Store]
// for_store: {
//     type: 'relationship',
//     target: 'Store',
//     direction: 'out',
//     eager: true // kada se otvore moje porudzbine da mi prikazuje koja je radnja u pitanju
// }
neo4j.model('Order').relationship('for_store','FOR_STORE','for_store','direction_out','Store',{
    //treba da se poklopi sa datumom i vremenom iz relacije customer - order
    date: {
        type: 'localdate',
        required: true
    },
    timeOrder: {
        type: 'localtime',
        required: true
    },
    timeMade: {
        type: 'localtime',
    }
})
neo4j.model('Store').relationship('receive_order','FOR_STORE','receive_order','direction_in','Order',{
    //treba da se poklopi sa datumom i vremenom iz relacije customer - order
    date: {
        type: 'localdate',
        required: true
    },
    timeOrder: {
        type: 'localtime',
        required: true
    },
    timeMade: {
        type: 'localtime',
    }
})


//veza PICKS_UP [Deliverer, Order]
// picks_up: { 
//     type: 'relationship',
//     target: 'Order',
//     relationship: 'PICKS_UP',
//     direction: "out",
//     properties: {
//         timePicked: "localtime"
//     }

// }
neo4j.model('Deliverer').relationship('picks_up','PICKS_UP','picks_up','direction_out','Order',{
    date: {
        type: 'localdate',
        required: true
    },
    time: {
        type: 'localtime',
        required: true
    },
})
neo4j.model('Order').relationship('picked_up','PICKS_UP','picked_up','direction_in','Deliverer',{
    date: {
        type: 'localdate',
        required: true
    },
    time: {
        type: 'localtime',
        required: true
    },
})

//veza CONTAINS [Meal, Ingredient]
// contains_ingredient: {
//     type: 'relationship',
//     target: 'Ingredient',
//     relationship: 'CONTAINS_INGREDIENT',
//     direction: 'out',
//     eager: true
// }
neo4j.model('Meal').relationship('contains','CONTAINS','contains','direction_out','Ingredient', {
    cascade: 'detach'
})
neo4j.model('Ingredient').relationship('in_meal','CONTAINS','in_meal','direction_in','Meal', {
    cascade: 'detach'
})

//veza COOKS [Store, Meal]
// cooks: {
//     type: 'relationship',
//     target: 'Meal',
//     relationship: 'COOKS',
//     direction: 'out',
//     properties: {
//         time: {
//             type: 'number',
//             required: true
//         }
//         //odeljak??? 
//     }
// }
neo4j.model('Store').relationship('cooks','COOKS','cooks','direction_out','Meal',{
    timePreparing: { 
        type: 'number',
        required: true
    },
    cascade: 'detach',
    eager: false
})
neo4j.model('Meal').relationship('cooked','COOKS','cooked','direction_in','Store',{
    timePreparing: { 
        type: 'number',
        required: true
    },
    cascade: 'delete',
    eager: true
})