var http = require('http');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var dgram = require('dgram');
var server = null;


global.CLOSURE_BASE_PATH = 'vendor/google-closure-library/closure/goog/';
goog = require('closure').Closure(global)
goog.loadScript('public/deps.js');


goog.require('game.Tank');


var lastMsg = {};

var game = {
  players: []
};


var Core = function() {
};


Core.prototype.init = function() {
  this.startServer();
  this.startWebsite();

  setInterval(function() {
    for (var addr in lastMsg) {
      if (Date.now() - lastMsg[addr] > 3000) {
        console.log('KICK ' + addr);
        delete lastMsg[addr];
      }
    }
  }, 3000);
};


Core.prototype.processMessage = function(zippedMsg, rinfo) {
  var self = this;
  zlib.unzip(zippedMsg, function(err, buf) {
    var addr = rinfo.address;
    var port = rinfo.port;
    var msg = buf.toString();
    var json = null;

    try {
      json = JSON.parse(msg);
    } catch (ex) {
      console.log(ex);
    }

    if (json && json.api) {
      switch (json.api) {
        case 'login':
          game.players.push({ username: 'agilbert' });
          var tmp = {
            api: 'init',
            game: game
          };
          self.send([tmp], addr, port);
          break;
        case 'connect':
          pub.send('/');
          break;
        case 'moveForward':
          break;
        case 'heartbeat':
          break;
      }
    }

    console.log('Server got: ' + msg + ' from ' + addr + ':' + port);

    lastMsg[addr + ':' + port] = Date.now();

  });
};


Core.prototype.send = function(msg, addr, port) {
  var json = JSON.stringify(msg);
  var res = new Buffer(json);
  zlib.deflate(res, function(err, buf) {
    server.send(buf, 0, buf.length, port, addr);
  });
};


/**
 *
 */
Core.prototype.startServer = function() {
  var self = this;

  server = dgram.createSocket('udp4');

  server.on('listening', function() {
    var address = server.address();
    console.log('Server listening ' + address.address + ':' + address.port);
  });

  server.on('message', function(zippedMsg, rinfo) {
    self.processMessage(zippedMsg, rinfo);
  });

  server.bind(8080);
};


Core.prototype.startWebsite = function() {
  http.createServer(function(req, res) {

    if (req.url == '/events/') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });

      var callback = function(data) {
        res.write('data: \n\n');
      };

      res.socket.on('close', function() {
      });
    } else {

      var filePath = '.' + req.url;
      if (filePath == './') {
        filePath = './public/index.html';
      }
      var extName = path.extname(filePath);
      var contentType = 'text/html';
      switch (extName) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
      }

      fs.exists(filePath, function(exists) {
        if (exists) {
          fs.readFile(filePath, function(err, data) {
            if (err) {
              res.writeHead(500);
              res.end();
            } else {
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(data, 'utf-8');
            }
          });
        } else {
          res.writeHead(404);
          res.end();
        }
      });

    }
  }).listen(8000, '127.0.0.1');
};


module.exports = Core;
