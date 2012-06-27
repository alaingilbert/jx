goog.provide('GameEngine');

goog.require('game.Rect');
goog.require('game.RectManager');
goog.require('jx.Controler');
goog.require('jx.Core');
goog.require('jx.MediaManager');
goog.require('goog.events');
goog.require('goog.events.MouseWheelHandler');



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

  var self = this;

  this.bindListeners();


  this.stateManager.on('startState', function(data) {
    console.log('StartState', data);
  });
  this.stateManager.on('endState', function(data) {
    console.log('EndState', data);
  });
  this.stateManager.addState('loading');
  this.stateManager.addState('game');


  this.controler = new jx.Controler({type: 'keyboard'});
  this.rectManager = new game.RectManager();

  // Add some objects.
  for (var i = 0; i < 10; i++) {
    this.rectManager.push(new game.Rect({ x: 0, y: 0, w: 10, h: 10 }));
  }


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
    self.start(); // Start the game loop.
  });
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
GameEngine.prototype.update = function(deltaTime) {
  switch (this.stateManager.currentState) {
    case this.stateManager.states['loading']:
      if (Date.now() - this.mediasProgress[0].timestamp > this.mediasDelay) {
        this.mediasProgress.splice(0, 1);
        if (this.mediasProgress.length == 0) {
          this.stateManager.changeState('Game');
        } else {
          this.mediasProgress[0].timestamp = Date.now();
        }
      } else {
        console.log(this.mediasProgress[0].filename);
      }
      break;
    default:
      this.controler.update(deltaTime);
      this.rectManager.update(deltaTime);
      break;
  }
};


/**
 *
 */
GameEngine.prototype.render = function() {
  GameEngine.superClass_.render.call(this);

  var ctx = this.ctx;
  ctx.save();
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


  switch (this.stateManager.currentState) {
    case this.stateManager.states['loading']:
      if (Date.now() - this.mediasProgress[0].timestamp > this.mediasDelay) {
        this.mediasProgress.splice(0, 1);
        if (this.mediasProgress.length == 0) {
          this.stateManager.changeState('Game');
        } else {
          this.mediasProgress[0].timestamp = Date.now();
        }
      } else {
        ctx.fillText(this.mediasProgress[0].filename, 100, 100);
      }
      break;
    default:
      this.controler.render();
      this.rectManager.render();
      break;
  }


  ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.restore();
};


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.mouseMove = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.mouseDown = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.mouseUp = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.mouseWheel = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.click = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.dblClick = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.keyDown = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.keyUp = function(evt) { };


/**
 * @param {Object} evt Event.
 */
GameEngine.prototype.resize = function(evt) { };


/**
 * Trigerred on window unload.
 * Perfect for the sound unload.
 * @param {Object} evt Event.
 */
GameEngine.prototype.unload = function(evt) { };


/**
 *
 */
GameEngine.prototype.bindListeners = function() {
  // Bind listeners
  // MouseMove
  goog.events.listen(this.canvas, goog.events.EventType.MOUSEMOVE,
                     this.mouseMove);
  // MouseDown
  goog.events.listen(this.canvas, goog.events.EventType.MOUSEDOWN,
                     this.mouseDown);

  // MouseUp
  goog.events.listen(this.canvas, goog.events.EventType.MOUSEUP,
                     this.mouseUp);

  // MouseWheel
  var mouseWheelHandler = new goog.events.MouseWheelHandler(this.canvas);
  goog.events.listen(mouseWheelHandler,
                     goog.events.MouseWheelHandler.EventType.MOUSEWHEEL,
                     this.mouseWheel);

  // Click
  goog.events.listen(this.canvas, goog.events.EventType.CLICK,
                     this.click);

  // dblClick
  goog.events.listen(this.canvas, goog.events.EventType.DBLCLICK,
                     this.dblClick);

  // keyDown
  goog.events.listen(document, goog.events.EventType.KEYDOWN,
                     this.keyDown);

  // keyUp
  goog.events.listen(document, goog.events.EventType.KEYUP,
                     this.keyUp);

  // Resize
  goog.events.listen(window, goog.events.EventType.RESIZE,
                     this.resize);

  // Unload
  goog.events.listen(window, goog.events.EventType.UNLOAD,
                     this.unload);
};


goog.exportSymbol('GameEngine', GameEngine);
goog.exportProperty(GameEngine.prototype, 'init', GameEngine.prototype.init);
