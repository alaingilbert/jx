goog.provide('jx.Utils');


/** */
jx.Utils = {};


/** */
jx.Utils.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||       // La forme standardisée
         window.webkitRequestAnimationFrame || // Pour Chrome et Safari
         window.mozRequestAnimationFrame ||    // Pour Firefox
         window.oRequestAnimationFrame ||      // Pour Opera
         window.msRequestAnimationFrame ||     // Pour Internet Explorer
         function(callback) {
           window.setTimeout(callback, 1000 / 60);
         };
})();
