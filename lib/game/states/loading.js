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
  var self = this;
  // Load some medias.
  var medias = { 'mario': '/public/img/mario.png',
                 'mario1': '/public/img/bridge.jpeg',
                 'gamepad': '/public/img/gamepad.jpg',
                 'keyboard': '/public/img/keyboard.jpeg',
                 'tiles': '/public/img/tiles.png',
                 'green': '/public/img/green.png',
                 'red': '/public/img/red.png',
                 'trees': '/public/img/trees.png',
               };
  this.mediasProgress = [];
  this.mediasDelay = 50;
  this.nbLoaded = 1;
  this.total = 8;
  this.progress = this.nbLoaded / this.total;
  this.mediaManager = new jx.MediaManager();
  this.mediaManager.on('progress', function(data) {
    console.log('PROGRESS: %s', data.progress * 100);
    data.timestamp = Date.now();
    self.mediasProgress.push(data);
  });
  this.mediaManager.loadMedias(medias, function() {
    console.log('ALL MEDIAS LOADED');
    Game.medias = this.medias;
    Game.start(); // Start the game loop.
  });
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
game.StateLoading.prototype.update = function(deltaTime) {
  if (Date.now() - this.mediasProgress[0].timestamp > this.mediasDelay) {
    this.mediasProgress.splice(0, 1);
    this.progress = ++this.nbLoaded / this.total;
    if (this.mediasProgress.length == 0) {
      Game.stateManager.changeState('menu');
    } else {
      this.mediasProgress[0].timestamp = Date.now();
    }
  } else {
    //this.progress += 0.01;
  }
};


/**
 *
 */
game.StateLoading.prototype.render = function() {
  var ctx = Game.ctx;
  ctx.save();

  ctx.fillRect(0, 0, this.progress * Game.canvas.width, 10);
  ctx.font = '20px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText(this.mediasProgress[0].filename, 10, 15);

  ctx.restore();
};
