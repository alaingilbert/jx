goog.provide('GameEngine');

goog.require('jx.Controler');
goog.require('jx.Core');
goog.require('game.StateLoading');
goog.require('game.StateGame');
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

  this.bindListeners();

  this.stateManager.addState('loading', new game.StateLoading());
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
