var fs = require('fs');
var jsdom = require('jsdom').jsdom;
document = jsdom(fs.readFileSync('public/index.html'));
window = document.createWindow();


document.getElementById = function(id) {
  if (id == 'canvas') {
    return {getContext: function() {}};
  }
  return (this._ids && this._ids[id] && this._ids[id].length > 0 ? this._ids[id][0] : null);
};

global.CLOSURE_BASE_PATH = 'vendor/google-closure-library/closure/goog/';
goog = require('closure').Closure(global)
goog.loadScript('public/deps.js');


goog.require('jx.Core');


jx.Core.ctx = {
  fillRect: function() {}
};
