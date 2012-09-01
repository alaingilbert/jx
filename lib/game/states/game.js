goog.provide('game.StateGame');

goog.require('game.Rect');
goog.require('game.RectManager');
goog.require('game.Tank');
goog.require('jx.State');



/**
 * @constructor
 */
game.StateGame = function() {
  jx.State.call(this);
  this.drawed = false;
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

  this.tank = new game.Tank({x: 100, y: 100, w: 50, h: 50});
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
game.StateGame.prototype.update = function(deltaTime) {
  this.rectManager.update(deltaTime);

  this.tank.moveForward(Game.controler.UP);
  this.tank.moveBackward(Game.controler.DOWN);
  this.tank.rotateLeft(Game.controler.LEFT);
  this.tank.rotateRight(Game.controler.RIGHT);
  if (Game.controler.A) {
    this.tank.fire(Game.controler.A);
  }

  this.tank.update(deltaTime);
};


/**
 *
 */
game.StateGame.prototype.render = function() {
  Game.controler.render();
  this.drawFullMap();
  this.rectManager.render();
  this.tank.render();
};


game.StateGame.prototype.drawFullMap = function() {
  if (this.drawed) {
    var map = Game.getCache('map');
    Game.ctx.drawImage(map, 0, 0);
  } else {
    var map = Game.getCache('map', Game.canvas.width, Game.canvas.height);
    var c = map.getContext('2d');
    c.save();
    for (var i = 0; i < 50; i++) {
      c.save();
      for (var j = 0; j < 80; j++) {
        c.drawImage(Game.medias.tiles, 0, 112, 32, 32, 0, 0, 32, 32);
        c.translate(32, 0);
      }
      c.restore();
      c.translate(0, 32);
    }
    c.restore();
    Game.ctx.drawImage(map, 0, 0);
    this.drawed = true;
  }
};
