// Client with token

var jwt = require('jsonwebtoken');
var config = require('./../config');
var WebSocket = require('ws');

var token = jwt.sign({name: 'iostreamer'}, config.JWT_SECRETKEY, {
    expiresIn: 15 * 24* 60 * 60 * 1000 // 15 days 
})
var str = "/?token=TOKEN";
var ws = new WebSocket(config.SIGNALING_URL+str, {
    headers: {
        token: token
    }
});

ws.on('open', function open() {
    ws.send('message from client');
})

ws.on('message', function incomming(data) {
    console.log(data);
})