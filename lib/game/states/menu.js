goog.provide('game.StateMenu');

goog.require('jx.Button');
goog.require('jx.State');



/**
 * @constructor
 */
game.StateMenu = function() {
  jx.State.call(this);
};
goog.inherits(game.StateMenu, jx.State);


/**
 *
 */
game.StateMenu.prototype.init = function() {
  this.gameBtn = new jx.Button({x: 100, y: 100, w: 200, h: 100, text: 'Play'})
      .on('mouseUp', function(evt) { Game.stateManager.changeState('game'); });
  this.ctrlBtn = new jx.Button({x: 100, y: 220, w: 200, h: 100, text: 'Controls'});
  this.soundBtn = new jx.Button({x: 100, y: 340, w: 200, h: 100, text: 'Sounds'});
};


game.StateMenu.prototype.end = function() {
  Game.uiManager.remove(this.gameBtn);
  Game.uiManager.remove(this.ctrlBtn);
  Game.uiManager.remove(this.soundBtn);
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
game.StateMenu.prototype.update = function(deltaTime) {
};


/**
 *
 */
game.StateMenu.prototype.render = function() {
  var ctx = Game.ctx;
  ctx.save();

  this.gameBtn.render();
  this.ctrlBtn.render();
  this.soundBtn.render();
  ctx.drawImage(Game.medias.gamepad, 520, 100);

  ctx.restore();
};
