goog.provide('jx.StateManager');

goog.require('jx.EventEmitter');



/**
 *
 */
jx.StateManager = function() {
  jx.EventEmitter.call(this);
  this.states = {};
  this.currentState = null;
  this.nbStates = 0;
};
goog.inherits(jx.StateManager, jx.EventEmitter);


/**
 *
 */
jx.StateManager.prototype.addState = function(label, state) {
  this.states[label] = state;
  if (++this.nbStates == 1) {
    this.changeState(label);
  }
};


/**
 *
 */
jx.StateManager.prototype.changeState = function(label) {
  if (!this.states[label]) {
    throw new Error('State "' + label + '" does not exists.');
  }


  if (this.currentState != null) {
    this.currentState.end();
  }
  this.currentState = this.states[label];
  console.log(this.currentState, this.states, label);
  this.currentState.init();
};


/**
 *
 */
jx.StateManager.prototype.update = function(deltaTime) {
  if (this.currentState) {
    this.currentState.update(deltaTime);
  }
};


/**
 *
 */
jx.StateManager.prototype.render = function() {
  if (this.currentState) {
    this.currentState.render();
  }
};
