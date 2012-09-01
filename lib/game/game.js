goog.provide('GameEngine');

goog.require('game.StateGame');
goog.require('game.StateLoading');
goog.require('game.StateMenu');
goog.require('jx.Controler');
goog.require('jx.Core');



/**
 * @constructor
 * @extends {jx.Core}
 */
GameEngine = function() {
  jx.Core.call(this);
};
goog.inherits(GameEngine, jx.Core);


/**
 * @param {string} canvasId Canvas Id.
 */
GameEngine.prototype.init = function(canvasId) {
  GameEngine.superClass_.init.call(this, canvasId);

  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  this.stateManager.addState('loading', new game.StateLoading());
  this.stateManager.addState('menu', new game.StateMenu());
  this.stateManager.addState('game', new game.StateGame());

  this.controler = new jx.Controler({type: 'keyboard'});
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
GameEngine.prototype.update = function(deltaTime) {
  GameEngine.superClass_.update.call(this, deltaTime);

  this.controler.update(deltaTime);
};


/**
 *
 */
GameEngine.prototype.render = function() {
  var ctx = this.ctx;
  ctx.save();
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


  GameEngine.superClass_.render.call(this);


  ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.font = '30px sans-serif';
  ctx.fillText('FPS: ' + this.getFps(), 100, 600);
  ctx.restore();
};


goog.exportSymbol('GameEngine', GameEngine);
goog.exportProperty(GameEngine.prototype, 'init', GameEngine.prototype.init);
