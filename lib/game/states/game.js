goog.provide('game.StateGame');

goog.require('jx.State');
goog.require('game.Rect');
goog.require('game.RectManager');



/**
 * @constructor
 */
game.StateGame = function() {
  jx.State.call(this);
};
goog.inherits(game.StateGame, jx.State);


/**
 *
 */
game.StateGame.prototype.init = function() {
  this.rectManager = new game.RectManager();

  // Add some objects.
  for (var i = 0; i < 10; i++) {
    this.rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  }
};


/**
 *
 */
game.StateGame.prototype.update = function(deltaTime) {
  this.rectManager.update(deltaTime);
};


/**
 *
 */
game.StateGame.prototype.render = function() {
  Game.controler.render();
  this.rectManager.render();
};
