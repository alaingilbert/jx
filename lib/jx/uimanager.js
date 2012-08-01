goog.provide('jx.UiManager');

goog.require('jx.Manager');



/**
 * @constructor
 */
jx.UiManager = function() {
  jx.Manager.call(this);
};
goog.inherits(jx.UiManager, jx.Manager);


/**
 *
 */
jx.UiManager.prototype.mouseMove = function(evt) {
  for (var i = 0; i < this.objs.length; i++) {
    var obj = this.objs[i];
    if (obj.isInside(evt.clientX, evt.clientY)) {
      obj.mouseMove(evt);
    }
  }
};


/**
 *
 */
jx.UiManager.prototype.mouseDown = function(evt) {
  for (var i = 0; i < this.objs.length; i++) {
    var obj = this.objs[i];
    if (obj.isInside(evt.clientX, evt.clientY)) {
      obj.mouseDown(evt);
    }
  }
};


/**
 *
 */
jx.UiManager.prototype.mouseUp = function(evt) {
  for (var i = 0; i < this.objs.length; i++) {
    var obj = this.objs[i];
    if (obj.isInside(evt.clientX, evt.clientY)) {
      obj.mouseUp(evt);
    }
  }
};
