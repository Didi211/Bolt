const Neode = require("neode")

const dbuser = 'neo4j'
const dbpass = 'c-mwCvesZ2pvYcHxtkGjSko-tnc0dqofp1kPmFbCjEc'
const connectionURL = 'neo4j+s://98dc3133.databases.neo4j.io:7687'
const dbname = 'Bolt Food Delivery'

const instance = new Neode(connectionURL,dbuser,dbpass,true,dbname);

