const redis_client = require('./redis_config')
const WebSocket = require('ws')


const WEB_SOCKET_PORT_CUSTOMER = 3000;
const WEB_SOCKET_PORT_DELIVERER = 3001;
const WEB_SOCKET_PORT_STORE = 3002;

const serverCustomer = new WebSocket.Server({ port : WEB_SOCKET_PORT_CUSTOMER });
const serverDeliverer = new WebSocket.Server({ port : WEB_SOCKET_PORT_DELIVERER });
const serverStore = new WebSocket.Server({ port : WEB_SOCKET_PORT_STORE });


var redisCustomer = redis_client.duplicate()
redisCustomer.subscribe('app:customer');
var redisDeliverer = redis_client.duplicate()
redisDeliverer.subscribe('app:deliverer');
var redisStore = redis_client.duplicate()
redisStore.subscribe('app:store');

// // Register event for client connection
serverCustomer.on('connection', function connection(ws) {
//   // broadcast on web socket when receving a Redis PUB/SUB Event
redisCustomer.on('message', function(channel, message){
    console.log(message);
    ws.send(message);
  })

});

serverDeliverer.on('connection', function connection(ws) {

//   // broadcast on web socket when receving a Redis PUB/SUB Event
redisDeliverer.on('message', function(channel, message){
    console.log(message);
    ws.send(message);
  })

});

serverStore.on('connection', function connection(ws) {
//   // broadcast on web socket when receving a Redis PUB/SUB Event
redisStore.on('message', function(channel, message){
    console.log(message);
    ws.send(message);
  })
    
});


module.exports = redis_client;