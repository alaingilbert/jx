goog.provide('jx.Websocket');

goog.require('jx.EventEmitter');



/**
 * @param {string} wsUri The websocket uri.
 * @constructor
 */
jx.Websocket = function(wsUri) {
  jx.EventEmitter.call(this);

  this.socket = new window['WebSocket'](wsUri);
  this.isConnected = false;
  this.cancel = false;
  this.msgId = 0;

  this.socket.onopen = function(evt) {
    if (this.cancel) {
      this.socket.close();
    } else {
      this.emit('connect');
    }
  }.bind(this);

  this.socket.onclose = function(evt) {
    this.emit('disconnect');
  }.bind(this);

  this.socket.onmessage = function(evt) {
  }.bind(this);

  this.socket.onerror = function(evt) {
    this.emit('error', evt);
  }.bind(this);
};
goog.inherits(jx.Websocket, jx.EventEmitter);


/**
 *
 */
jx.Websocket.prototype.close = function() {
  this.cancel = true;
  if (this.isConnected) {
    this.socket.close();
  }
};
