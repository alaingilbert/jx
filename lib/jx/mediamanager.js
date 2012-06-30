goog.provide('jx.MediaManager');

goog.require('jx.EventEmitter');



/**
 * @constructor
 * @extends {jx.EventEmitter}
 */
jx.MediaManager = function() {
  jx.EventEmitter.call(this);
  this.medias = {};
  this.progress = 0;
};
goog.inherits(jx.MediaManager, jx.EventEmitter);


/**
 * Load all the medias async.
 * @param {Object.<Object, string>} medias Dictionnay of medias (name -> path).
 * @param {Function=} opt_callback Callback.
 */
jx.MediaManager.prototype.loadMedias = function(medias, opt_callback) {
  var self = this;
  var size = 0;
  for (var i in medias) { size++; }
  var loaded = 0;
  for (var i in medias) {
    (function(label) {
      if (medias[label].substr(-3) == 'png' ||
          medias[label].substr(-3) == 'jpg' ||
          medias[label].substr(-4) == 'jpeg') {
        var img = new window['Image']();
        img.src = medias[label];
        img.onload = function() {
          self.medias[label] = this;
          loaded++;
          self.progress = loaded / size;
          self.emit('progress', {
            progress: self.progress,
            filename: medias[label]
          });
          if (loaded == size) {
            opt_callback.call(self);
          }
        };
      } else if (medias[label].substr(-3) == 'mp3' ||
                 medias[label].substr(-3) == 'ogg')
      {
        self.medias[label] = medias[label];
        loaded++;
        self.progress = loaded / size;
        self.emit('progress', {
          progress: self.progress,
          filename: medias[label]
        });
        if (loaded == size) {
          opt_callback.call(self);
        }
      } else {
        window.console.log('Bad media type.', medias[label]);
      }
    })(i);
  }
};
