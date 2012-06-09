var assert = require('chai').assert
  , sinon = require('sinon');


goog.require('jx.Manager');
goog.require('jx.Object2D');


describe('Manager', function() {
  it('should have an update function', function() {
    var manager = new jx.Manager();
    assert.isFunction(manager.update);
  });


  it('should have a render function', function() {
    var manager = new jx.Manager();
    assert.isFunction(manager.render);
  });


  it('should have a push function', function() {
    var manager = new jx.Manager();
    assert.isFunction(manager.push);
  });


  describe('push', function() {
    it('should append the object to the objs array', function() {
      var manager = new jx.Manager();
      var obj = new jx.Object2D();
      var res1 = manager.objs.length;
      manager.push(obj);
      var res2 = manager.objs.length;
      assert.equal(res1, 0);
      assert.equal(res2, 1);
    });
  });


  describe('update', function() {
    it('should update every objects', function() {
      var manager = new jx.Manager();
      var obj1 = new jx.Object2D();
      var obj2 = new jx.Object2D();
      var obj3 = new jx.Object2D();
      var mock1 = sinon.mock(obj1).expects('update').once();
      var mock2 = sinon.mock(obj2).expects('update').once();
      var mock3 = sinon.mock(obj3).expects('update').once();
      manager.push(obj1);
      manager.push(obj2);
      manager.push(obj3);
      manager.update();
      mock1.verify();
      mock2.verify();
      mock3.verify();
    });
  });


  describe('update', function() {
    it('should render every objects', function() {
      var manager = new jx.Manager();
      var obj1 = new jx.Object2D();
      var obj2 = new jx.Object2D();
      var obj3 = new jx.Object2D();
      var mock1 = sinon.mock(obj1).expects('render').once();
      var mock2 = sinon.mock(obj2).expects('render').once();
      var mock3 = sinon.mock(obj3).expects('render').once();
      manager.push(obj1);
      manager.push(obj2);
      manager.push(obj3);
      manager.render();
      mock1.verify();
      mock2.verify();
      mock3.verify();
    });
  });
});
