var assert = require('chai').assert
  , sinon = require('sinon');


goog.require('jx.Core');
goog.require('jx.Utils');
goog.require('jx.Manager');

var backupCore = goog.cloneObject(jx.Core);
var backupUtils = goog.cloneObject(jx.Utils);


describe('Core', function() {
  beforeEach(function() {
    // Reset the Core object before each test.
    jx.Core = goog.cloneObject(backupCore);
    jx.Utils = goog.cloneObject(backupUtils);
  });

  it('should have an update method', function() {
    assert.isFunction(jx.Core.update);
  });


  describe('update', function() {
    it('should not crash when there is no manager', function() {
      jx.Core.managers_ = [];
      assert.doesNotThrow(jx.Core.update);
    });


    it('should update all managers', function() {
      var manager1 = new jx.Manager();
      var manager2 = new jx.Manager();
      var manager3 = new jx.Manager();
      var mock1 = sinon.mock(manager1).expects('update').once();
      var mock2 = sinon.mock(manager2).expects('update').once();
      var mock3 = sinon.mock(manager3).expects('update').once();
      jx.Core.managers_ = [manager1, manager2, manager3];
      jx.Core.update();
      mock1.verify();
      mock2.verify();
      mock3.verify();
    });
  });


  describe('render', function() {
    it('should not crash when there is no manager', function() {
      jx.Core.managers_ = [];
      assert.doesNotThrow(jx.Core.render);
    });


    it('should render all managers', function() {
      var manager1 = new jx.Manager();
      var manager2 = new jx.Manager();
      var manager3 = new jx.Manager();
      var mock1 = sinon.mock(manager1).expects('render').once();
      var mock2 = sinon.mock(manager2).expects('render').once();
      var mock3 = sinon.mock(manager3).expects('render').once();
      jx.Core.managers_ = [manager1, manager2, manager3];
      jx.Core.render();
      mock1.verify();
      mock2.verify();
      mock3.verify();
    });
  });


  describe('cycle', function() {
    it('should do nothing if the core is not started', function() {
      var mock1 = sinon.mock(jx.Core).expects('update').never();
      var mock2 = sinon.mock(jx.Core).expects('render').never();
      var mock3 = sinon.mock(jx.Utils).expects('requestAnimFrame').never();
      jx.Core.isStarted_ = false;
      jx.Core.cycle();
      mock1.verify();
      mock2.verify();
      mock3.verify();
    });


    it('should cycle if the core is started', function() {
      var mock1 = sinon.mock(jx.Core).expects('update').once();
      var mock2 = sinon.mock(jx.Core).expects('render').once();
      var mock3 = sinon.mock(jx.Utils).expects('requestAnimFrame').once();
      jx.Core.isStarted_ = true;
      jx.Core.cycle();
      mock1.verify();
      mock2.verify();
      mock3.verify();
    });
  });


  describe('start', function() {
    it('', function() {
      var mock = sinon.mock(jx.Core).expects('cycle').once();
      jx.Core.start();
      assert.isTrue(jx.Core.isStarted_);
      mock.verify();
    });
  });


  describe('init', function() {
    it('', function() {
      jx.Core.init();
    });
  });


  after(function() {
    // Reset the Core object before each test.
    jx.Core = goog.cloneObject(backupCore);
    jx.Utils = goog.cloneObject(backupUtils);
  });
});
