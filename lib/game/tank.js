goog.provide('game.Tank');

goog.require('jx.Object2D');



/**
 * @param {Object} params Parameters.
 * @constructor
 * @extends {jx.Object2D}
 */
game.Tank = function(params) {
  jx.Object2D.call(this, params);

  this.health = 100;

  this.maxVelocity = 100;
  this.rotationVelocity = 1;
  this.acceleration = 50;
  this.deceleration = 70;
  this.fireDelay = 1000;
  this.fireTimestamp = Date.now();

  this.turretAngle = 0;
  this.turretRotationVelocity = 1;

  this.Ctrl = { MOVE_FORWARD: 0,
                MOVE_BACKWARD: 0,
                ROTATE_LEFT: 0,
                ROTATE_RIGHT: 0,
                TURRET_ROTATE_LEFT: 0,
                TURRET_ROTATE_RIGHT: 0
              };
};
goog.inherits(game.Tank, jx.Object2D);


/** @param {number} speed Speed in percent. */
game.Tank.prototype.moveForward = function(speed) {
  this.Ctrl.MOVE_FORWARD = speed;
};


/** @param {number} speed Speed in percent. */
game.Tank.prototype.moveBackward = function(speed) {
  this.Ctrl.MOVE_BACKWARD = speed;
};


/** @param {number} speed Speed in percent. */
game.Tank.prototype.rotateLeft = function(speed) {
  this.Ctrl.ROTATE_LEFT = speed;
};


/** @param {number} speed Speed in percent. */
game.Tank.prototype.rotateRight = function(speed) {
  this.Ctrl.ROTATE_RIGHT = speed;
};


/**
 *
 */
game.Tank.prototype.fire = function() {
  if (Date.now() - this.fireTimestamp > this.fireDelay) {
    this.fireTimestamp = Date.now();
    console.log('FIRE');
  }
};


/**
 * @param {number} deltaTime Delta time since the last frame.
 */
game.Tank.prototype.update = function(deltaTime) {
  var speed = 1;
  var tmp = deltaTime / 1000;
  if (this.Ctrl.MOVE_FORWARD) {
    this.x += Math.cos(this.angle) * speed * this.maxVelocity * tmp;
    this.y += Math.sin(this.angle) * speed * this.maxVelocity * tmp;
  }
  if (this.Ctrl.MOVE_BACKWARD) {
    this.x -= Math.cos(this.angle) * speed * this.maxVelocity * tmp;
    this.y -= Math.sin(this.angle) * speed * this.maxVelocity * tmp;
  }
  if (this.Ctrl.ROTATE_LEFT) {
    this.angle -= Math.PI * speed * this.rotationVelocity * tmp;
  }
  if (this.Ctrl.ROTATE_RIGHT) {
    this.angle += Math.PI * speed * this.rotationVelocity * tmp;
  }
  if (this.Ctrl.TURRET_ROTATE_LEFT) {
    this.turretAngle -= Math.PI * speed * this.turretRotationVelocity * tmp;
  }
  if (this.Ctrl.TURRET_ROTATE_RIGHT) {
    this.turretAngle += Math.PI * speed * this.turretRotationVelocity * tmp;
  }
};


/**
 *
 */
game.Tank.prototype.render = function() {
  var ctx = Game.ctx;
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);

  // Thank
  ctx.fillStyle = '#0000ff';
  ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
  //ctx.save();
  //ctx.rotate(Math.PI/2);
  //ctx.drawImage(Game.medias.red,
  //    0, 0, 254, 288,
  //    -this.w / 2, -this.h / 2, this.w, this.h);
  //ctx.restore();



  // Turret
  ctx.save();
  ctx.translate(0, 0);
  ctx.rotate(this.turretAngle);
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, -10 / 2, 40, 10);

  //ctx.save();
  //ctx.rotate(Math.PI/2);
  ////ctx.drawImage(Game.medias.red,
  ////    971, 1219, 127, 428,
  ////    0, -10 / 2, 20, 90);
  //ctx.restore();

  ctx.restore();

  ctx.restore();
};
