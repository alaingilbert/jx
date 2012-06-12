goog.provide('Game');

goog.require('jx.Core');
goog.require('game.Rect');
goog.require('game.RectManager');



Game = function() {};


/**
 *
 */
Game.prototype.init = function() {
  console.log('INIT');

  jx.Core.init('canvas');


  var rectManager = new game.RectManager();
  jx.Core.managers_.push(rectManager);

  jx.Core.start();

  rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
};

Game = new Game();

goog.exportSymbol('Game', Game);
goog.exportSymbol('Game.init', Game.init);
