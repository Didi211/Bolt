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
const ingredient = require('./routes/ingredient')


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
// app.use('/api/user',user); da ne bi smo mogli da kreiramo praznog usera jer je on kao abstraktna klasa 
app.use('/api/ingredient',ingredient);



/*koristiti neku od ovih funkcija samo kad je potrebno izmeniti schemu, u ostalim situacijama nema potrebe*/
/*sluzi za instaliranje scheme definisane modelima na bazu u cloud-u*/
// neo4j.schema.install().then(() => console.log('Schema installed!'))

/*sluzi da ocisti celu bazu zajedno sa cvorovima, ne radi bas uvek*/
//  neo4j.schema.drop().then(() => console.log('Schema dropped!'))


app.listen(5000,() => {
    console.log('Server is listening on port 5000...');
});