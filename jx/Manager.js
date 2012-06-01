goog.provide('fx.Manager');



/**
 * @constructor
 */
fx.Manager = function() {
  this.objs = [];
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
fx.Manager.prototype.update = function(deltaTime) {
  for (var i = this.objs.length; i > 0; i--) {
    var obj = this.objs[i];
    obj.update();
  }
};


/**
 *
 */
fx.Manager.prototype.render = function() {
  for (var i = this.objs.length; i > 0; i--) {
    var obj = this.objs[i];
    obj.render();
  }
};
