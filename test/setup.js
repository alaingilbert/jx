global.CLOSURE_BASE_PATH = 'vendor/google-closure-library/closure/goog/';
goog = require('closure').Closure(global)
goog.loadScript('public/deps.js');


goog.require('jx.Core');


jx.Core.ctx = {
  fillRect: function() {}
};
