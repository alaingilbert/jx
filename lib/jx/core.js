goog.provide('jx.Core');

goog.require('goog.events');
goog.require('goog.events.MouseWheelHandler');
goog.require('jx.StateManager');
goog.require('jx.UiManager');
goog.require('jx.Utils');



/**
 * @constructor
 */
jx.Core = function() {
};


/**
 * @param {Object} canvasId The canvas id.
 */
jx.Core.prototype.init = function(canvasId) {
  this.isStarted_ = false;
  this.lastFrame_ = -1;
  this.stateManager = new jx.StateManager();
  this.uiManager = new jx.UiManager();
  this.timers_ = [];
  this.managers_ = [];
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
  this.bindListeners();
};


/** */
jx.Core.prototype.start = function() {
  var self = this;
  this.isStarted_ = true;
  this.lastFrame_ = Date.now();
  this.requestAnimFrame()(function() { self.cycle() });
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
jx.Core.prototype.update = function(deltaTime) {
  for (var i = 0, length = this.timers_.length; i < length; i++) {
    this.timers_[i].update(deltaTime);
  }

  this.stateManager.update(deltaTime);

  for (var i = 0, length = this.managers_.length; i < length; i++) {
    this.managers_[i].update(deltaTime);
  }
};


/** */
jx.Core.prototype.render = function() {
  var ctx = this.ctx;
  ctx.save();
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.stateManager.render();

  for (var i = 0, length = this.managers_.length; i < length; i++) {
    this.managers_[i].render();
  }

  ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.restore();
};


/** */
jx.Core.prototype.cycle = function() {
  var self = this;
  if (this.isStarted_) {
    var deltaTime = Date.now() - this.lastFrame_;
    this.update(deltaTime);
    this.render();
    this.lastFrame_ = Date.now();
    this.requestAnimFrame()(function() { self.cycle() });
  }
};


/**
 * @return {Function} RequestAnimationFrame.
 */
jx.Core.prototype.requestAnimFrame = function() {
  return window.requestAnimationFrame ||       // La forme standardisée
         window.webkitRequestAnimationFrame || // Pour Chrome et Safari
         window.mozRequestAnimationFrame ||    // Pour Firefox
         window.oRequestAnimationFrame ||      // Pour Opera
         window.msRequestAnimationFrame ||     // Pour Internet Explorer
         function(callback) {
           window.setTimeout(callback, 1000 / 60);
         };
};


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.mouseMove = function(evt) {
  this.uiManager.mouseMove(evt);
};


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.mouseDown = function(evt) {
  this.uiManager.mouseDown(evt);
};


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.mouseUp = function(evt) {
  this.uiManager.mouseUp(evt);
};


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.mouseWheel = function(evt) {
};


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.click = function(evt) { };


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.dblClick = function(evt) { };


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.keyDown = function(evt) { };


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.keyUp = function(evt) { };


/**
 * @param {Object} evt Event.
 */
jx.Core.prototype.resize = function(evt) { };


/**
 * Trigerred on window unload.
 * Perfect for the sound unload.
 * @param {Object} evt Event.
 */
jx.Core.prototype.unload = function(evt) { };


/**
 *
 */
jx.Core.prototype.bindListeners = function() {
  // Bind listeners
  // MouseMove
  goog.events.listen(this.canvas, goog.events.EventType.MOUSEMOVE,
                     this.mouseMove.bind(this));
  // MouseDown
  goog.events.listen(this.canvas, goog.events.EventType.MOUSEDOWN,
                     this.mouseDown.bind(this));

  // MouseUp
  goog.events.listen(this.canvas, goog.events.EventType.MOUSEUP,
                     this.mouseUp.bind(this));

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


