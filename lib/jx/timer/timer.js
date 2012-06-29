goog.provide('jx.Timer');



/**
 * @constructor
 */
jx.Timer = function(callback, delay) {
  this.loop = false;
  this.delay = delay;
  this.callback = callback;
  this.counter_ = 0;

  // TODO: How can I remove the "Game" constant.
  Game.timers_.push(this);
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
jx.Timer.prototype.update = function(deltaTime) {
  this.counter_ += deltaTime;
  if (this.counter_ >= this.delay) {
    this.counter_ -= this.delay;
    this.callback.call();
  }
};
