goog.provide('Game');
goog.require('jx.Core');
goog.require('jx.Rect');

Game = function() {};


/**
 *
 */
Game.prototype.init = function() {
  console.log('INIT');
  jx.Core.init('canvas');
  jx.Core.start();
  var rect = new jx.Rect({ x: 0, y: 0, w: 10, h: 10 });
  rect.render();
};

Game = new Game();

goog.exportSymbol('Game', Game);
goog.exportSymbol('Game.init', Game.init);
