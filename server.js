var replify = require('replify');
//var jwt = require('jsonwebtoken');
var config = require('./config');
var https = require('https');
var fs = require('fs');

var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/fullchain.pem', 'utf8');
 
var credentials = {key: privateKey, 
                    cert: certificate};

var server = https.createServer(credentials);
var switchboard = require('./')(server, { servelib: true });
var port = parseInt(process.env.NODE_PORT || process.env.PORT || process.argv[2], 10) || config.PORT;
//var host = process.env.NODE_HOST || process.env.HOST || 'localhost';


server.on('request', function(req, res) {
  //console.log('req.query: ', req.query.token);
  res.writeHead(200);
  res.end('Wellcome to troidat.com\n');
});

// start the server
server.listen(port, function(err) {
  if (err) {
    return console.log('Encountered error starting server: ', err);
  }

  console.log('server running at http://localhost'  + ':' + port + '/');
});

// add the repl
replify({
  name: 'switchboard',
  app: switchboard,
  contexts: {
    server: server
  }
});

switchboard.on('room:create', function(room) {
  console.log('room ' + room + ' created, now have ' + switchboard.rooms.length + ' active rooms');
});

switchboard.on('room:destroy', function(room) {
  console.log('room ' + room + ' destroyed, ' + switchboard.rooms.length + ' active rooms remain');

  if (typeof gc == 'function') {
    console.log('gc');
    gc();
  }
});
