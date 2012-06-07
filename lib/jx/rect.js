goog.provide('jx.Rect');
goog.require('jx.Core');
goog.require('jx.Object2D');



/**
 * @constructor
 * @extends {jx.Object2D}
 */
jx.Rect = function() {
  var params = arguments[0] || {};
  jx.Object2D.call(this, params);
};
goog.inherits(jx.Rect, jx.Object2D);


/** */
jx.Rect.prototype.render = function() {
  var c = jx.Core.ctx;
  c.fillRect(this.x, this.y, this.w, this.h);
};
