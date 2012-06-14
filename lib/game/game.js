goog.provide('Game');

goog.require('jx.Core');
goog.require('game.Rect');
goog.require('game.RectManager');



/**
 * @constructor
 * @extends {jx.Core}
 */
Game = function() {
  jx.Core.call(this);
};
goog.inherits(Game, jx.Core);


/**
 * @param {string} canvasId Canvas Id.
 */
Game.prototype.init = function(canvasId) {
  Game.constructor.superClass_.init.call(this, canvasId);

  this.rectManager = new game.RectManager();

  // Add some objects.
  for (var i = 0; i < 10; i++) {
    this.rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  }

  this.start(); // Start the game loop.
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
Game.prototype.update = function(deltaTime) {
  Game.constructor.superClass_.update.call(this, deltaTime);

  this.rectManager.update(deltaTime);
};


/**
 *
 */
Game.prototype.render = function() {
  Game.constructor.superClass_.render.call(this);

  var ctx = this.ctx;
  ctx.save();
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.rectManager.render();

  ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.restore();
};
