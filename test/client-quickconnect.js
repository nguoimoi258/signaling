var quickconnect = require('rtc-quickconnect');
var jwt = require('jsonwebtoken');
var config = require('./../config');


var token = jwt.sign({name: 'iostreamer'}, config.JWT_SECRETKEY, {
    expiresIn: 15 * 24* 60 * 60 * 1000 // 15 days 
})
var signaling_path = config.SIGNALING_URL +"/token=" + token;
var signaling_path2 = 'ws://localhost:3000/'


quickconnect(signaling_path2, { room: 'switchboard-test' })
  .createDataChannel('test')
  .once('channel:opened:test', function(peerId, dc) {
    dc.onmessage = function(evt) {
      console.log('received data: ', evt.data);
    };

    dc.send('hello');
  });
