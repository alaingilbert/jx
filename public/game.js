goog.provide('Game');

goog.require('jx.Core');
goog.require('game.Rect');
goog.require('game.RectManager');



Game = function() {};


/**
 *
 */
Game.prototype.init = function() {
  jx.Core.init('canvas');


  var rectManager = new game.RectManager();

  jx.Core.managers_.push(rectManager);


  for (var i = 0; i < 10; i++) {
    rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  }


  jx.Core.start();
};

Game = new Game();

goog.exportSymbol('Game', Game);
goog.exportSymbol('Game.init', Game.init);
