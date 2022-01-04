const express = require('express');
const cors = require('cors');
//jwt
const neo4j = require('./config/neo4j_config');

const user = require('./routes/user');
const customer = require('./routes/customer');
const deliverer = require('./routes/deliverer');
const meal = require('./routes/meal');
const order = require('./routes/order');
const store = require('./routes/store');

console.log(__dirname)

neo4j.withDirectory(__dirname + '/models')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());


app.use('/api/customer',customer);
app.use('/api/deliverer',deliverer);
app.use('/api/meal',meal);
app.use('/api/order',order);
app.use('/api/store',store);
app.use('/api/user',user);

// console.log(neo4j.schema)
// neo4j.schema.install().then(() => console.log('Schema installed!'))
// neo4j.schema.drop()
//     .then(() => console.log('Schema dropped!'))


app.listen(5000,() => {
    console.log('Server is listening on port 5000...');
});