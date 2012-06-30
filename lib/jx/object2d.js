goog.provide('jx.Object2D');



/**
 * @param {Object} params Parameters.
 * @constructor
 */
jx.Object2D = function(params) {
  params = params || {};
  this.x = params.x || 0;
  this.y = params.y || 0;
  this.w = params.w || 0;
  this.h = params.h || 0;
  this.angle = params.angle || 0;
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
jx.Object2D.prototype.update = function(deltaTime) { };


/** */
jx.Object2D.prototype.render = function() { };
