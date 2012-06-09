var assert = require('chai').assert
  , sinon = require('sinon');


goog.require('jx.Core');
goog.require('jx.Rect');


describe('Rectangle', function() {
  describe('constructor', function() {
    it('should set the given parameters', function() {
      var rect = new jx.Rect({x: 3, y: 4, w: 5, h: 6});
      assert.equal(rect.x, 3);
      assert.equal(rect.y, 4);
      assert.equal(rect.w, 5);
      assert.equal(rect.h, 6);
    });
  });


  describe('render', function() {
    it('should', function() {
      var mock = sinon.mock(jx.Core.ctx);
      mock.expects('fillRect').once();
      var rect = new jx.Rect();
      rect.render();
      mock.verify();
    });
  });


  it('should have an update function', function() {
    var rect = new jx.Rect();
    assert.isFunction(rect.update);
  });


  it('should have a render function', function() {
    var rect = new jx.Rect();
    assert.isFunction(rect.render);
  });
});
