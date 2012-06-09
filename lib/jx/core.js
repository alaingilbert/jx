goog.provide('jx.Core');
goog.require('jx.Utils');


/** */
jx.Core = {};


/**
 * @private
 * @type {boolean}
 */
jx.Core.isStarted_ = false;


/**
 *
 */
jx.Core.canvas = null;


/**
 *
 */
jx.Core.ctx = null;


/**
 * @private
 * @type {number}
 */
jx.Core.lastFrame_ = -1;


/**
 * @private
 * @type {Array}
 */
jx.Core.managers_ = [];


/** */
jx.Core.start = function() {
  jx.Core.isStarted_ = true;
  jx.Core.lastFrame_ = Date.now();
  jx.Core.cycle();
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
jx.Core.update = function(deltaTime) {
  for (var i = 0, length = jx.Core.managers_.length; i < length; i++) {
    jx.Core.managers_[i].update(deltaTime);
  }
};


/** */
jx.Core.render = function() {
  for (var i = 0, length = jx.Core.managers_.length; i < length; i++) {
    jx.Core.managers_[i].render();
  }
};


/** */
jx.Core.cycle = function() {
  if (jx.Core.isStarted_) {
    var deltaTime = Date.now() - jx.Core.lastFrame_;
    jx.Core.update();
    jx.Core.render();
    jx.Core.lastFrame_ = Date.now();
    jx.Utils.requestAnimFrame.call(window, jx.Core.cycle);
  }
};


/**
 * @param {Object} canvasId The canvas id.
 */
jx.Core.init = function(canvasId) {
  var canvas = canvasId || '';
  jx.Core.canvas = document.getElementById('canvas');
  jx.Core.ctx = jx.Core.canvas.getContext('2d');
};
