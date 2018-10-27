// Client with token

var jwt = require('jsonwebtoken');
var config = require('./../config');
var WebSocket = require('ws');

var token = jwt.sign({name: 'iostreamer'}, config.JWT_SECRETKEY, {
    expiresIn: 15 * 24* 60 * 60 * 1000 // 15 days 
})
var url_path = config.SIGNALING_URL +"/token=" + token;
var ws = new WebSocket(url_path);

ws.on('open', function open() {
    ws.send('message from client');
})

ws.on('message', function incomming(data) {
    console.log(data);
})