goog.provide('jx.Button');

goog.require('jx.EventEmitter');
goog.require('jx.Object2D');



/**
 * @param {Object} params Parameters.
 * @constructor
 * @extends {jx.Object2D}
 */
jx.Button = function(params) {
  params = params || {};
  jx.Object2D.call(this, params);
  jx.EventEmitter.call(this);
  this.text = params.text || '';
  this.backgroundColor = '#fff';
  Game.uiManager.push(this);
  return this;
};
goog.inherits(jx.Button, jx.Object2D);
jx.Button.prototype.__proto__ = jx.EventEmitter.prototype;
//goog.mixin(jx.Button, jx.EventEmitter);


/**
 *
 */
jx.Button.prototype.render = function() {
  var ctx = Game.ctx;
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, this.w, this.h);
  ctx.strokeRect(0, 0, this.w, this.h);
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000';
  ctx.fillText(this.text, this.w / 2, this.h / 2);
  ctx.restore();
};


/**
 *
 */
jx.Button.prototype.mouseUp = function(evt) {
  this.emit('mouseUp', evt);
};


/**
 *
 */
jx.Button.prototype.mouseDown = function(evt) {
  this.emit('mouseDown', evt);
};


/**
 *
 */
jx.Button.prototype.mouseMove = function(evt) {
  this.emit('mouseMove', evt);
};


/**
 *
 */
jx.Button.prototype.isInside = function(x, y) {
  return x > this.x &&
      x < this.x + this.w &&
      y > this.y &&
      y < this.y + this.h;
};
