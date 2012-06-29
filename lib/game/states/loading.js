goog.provide('game.StateLoading');

goog.require('jx.MediaManager');
goog.require('jx.State');



/**
 * @constructor
 */
game.StateLoading = function() {
  jx.State.call(this);
};
goog.inherits(game.StateLoading, jx.State);


/**
 *
 */
game.StateLoading.prototype.init = function() {
  console.log('LOADING INIT');
  var self = this;
  // Load some medias.
  var medias = { 'mario': './img/mario.png',
                 'mario1': './img/bridge.jpeg'
               };
  this.mediasProgress = [];
  this.mediasDelay = 1000;
  this.mediaManager = new jx.MediaManager();
  this.mediaManager.on('progress', function(data) {
    console.log('PROGRESS: %s', data.progress * 100);
    data.timestamp = Date.now();
    self.mediasProgress.push(data);
  });
  this.mediaManager.loadMedias(medias, function() {
    console.log('ALL MEDIAS LOADED');
    Game.start(); // Start the game loop.
  });
};


/**
 *
 */
game.StateLoading.prototype.update = function(deltaTime) {
  console.log('LOADING UPDATE');
  if (Date.now() - this.mediasProgress[0].timestamp > this.mediasDelay) {
    this.mediasProgress.splice(0, 1);
    if (this.mediasProgress.length == 0) {
      Game.stateManager.changeState('game');
    } else {
      this.mediasProgress[0].timestamp = Date.now();
    }
  }
};


/**
 *
 */
game.StateLoading.prototype.render = function() {
  var ctx = Game.ctx;
  ctx.save();

  ctx.font = '20px sans-serif';
  ctx.fillText(this.mediasProgress[0].filename, 100, 100);

  ctx.restore();
};
