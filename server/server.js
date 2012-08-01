var Core = require('../lib/server/core');
var zmq = require('zmq');
var pub = zmq.socket('pub');

pub.connect('tcp://127.0.0.1:60000');


var core = new Core();
core.init();
