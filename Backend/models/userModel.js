const  instance  = require('../config/dbconfig');


instance.model('User', {
    person_id: {
        primary: true,
        type: 'uuid',
        required: true, // Creates an Exists Constraint in Enterprise mode
    },
    name: {
        type: 'string',
        unique: 'true', // Creates a Unique Constraint
    },
    surname: {
        type: 'string',
        index: true, // Creates an Index
    },
    username: {        
        type: 'string',
        required: true, // Creates an Exists Constraint in Enterprise mode
    },
    password: 'string', // Simple schema definition of property : type
    location: 'string'

});