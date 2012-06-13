goog.provide('game.Rect');

goog.require('jx.Rect');
goog.require('goog.math.Vec2');


/**
 * @constructor
 */
game.Rect = function(params) {
  jx.Rect.call(this, params);
  this.velocity = new goog.math.Vec2(jx.Utils.rand(100, 400),
                                     jx.Utils.rand(100, 400));
};
goog.inherits(game.Rect, jx.Rect);


game.Rect.prototype.update = function(dt) {
  this.x += dt/1000 * this.velocity.x;
  this.y += dt/1000 * this.velocity.y;
  if (this.x < 0) {
    this.velocity.x = -this.velocity.x;
    this.x = 0;
  }
  if (this.x > jx.Core.canvas.width) {
    this.velocity.x = -this.velocity.x;
    this.x = jx.Core.canvas.width;
  }
  if (this.y > jx.Core.canvas.height) {
    this.velocity.y = -this.velocity.y;
    this.y = jx.Core.canvas.height;
  }
  if (this.y < 0) {
    this.velocity.y = -this.velocity.y;
    this.y = 0;
  }
};
