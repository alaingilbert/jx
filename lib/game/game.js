goog.provide('Game');

goog.require('jx.Core');
goog.require('jx.Controler');
goog.require('jx.MediaManager');
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
  var self = this;

  this.controler = new jx.Controler({type: 'keyboard'});
  this.rectManager = new game.RectManager();

  // Add some objects.
  for (var i = 0; i < 10; i++) {
    this.rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  }


  // Load some medias.
  var medias = {'mario': './img/mario.png',
                'mario1': './img/mario.png',
                'mario2': './img/mario.png'
               };
  var mediaManager = new jx.MediaManager();
  mediaManager.on('progress', function(progress) {
    console.log('PROGRESS: %s', progress*100);
  });
  mediaManager.loadMedias(medias, function() {
    console.log('ALL MEDIAS LOADED');
    self.start(); // Start the game loop.
  });
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
Game.prototype.update = function(deltaTime) {
  Game.constructor.superClass_.update.call(this, deltaTime);

  this.controler.update(deltaTime);
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


  this.controler.render();
  this.rectManager.render();


  ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.restore();
};
