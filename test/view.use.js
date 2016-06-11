'use strict';

require('mocha');
require('should');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var View = App.View;
var view, app;

describe('view.use', function() {
  beforeEach(function() {
    view = new View();
  });

  it('should expose the instance to `use`:', function(cb) {
    view.use(function(inst) {
      assert(inst instanceof View);
      cb();
    });
  });

  it('should be chainable:', function(cb) {
    view.use(function(inst) {
      assert(inst instanceof View);
    })
      .use(function(inst) {
        assert(inst instanceof View);
      })
      .use(function(inst) {
        assert(inst instanceof View);
        cb();
      });
  });

  it('should expose the view to a plugin:', function() {
    view.use(function(view) {
      assert(view instanceof View);
      view.foo = function(str) {
        return str + ' ' + 'bar';
      };
    });
    assert(view.foo('foo') === 'foo bar');
  });

  it('should be chainable:', function() {
    view
      .use(function(view) {
        view.a = 'aaa';
      })
      .use(function(view) {
        view.b = 'bbb';
      })
      .use(function(view) {
        view.c = 'ccc';
      });

    assert(view.a === 'aaa');
    assert(view.b === 'bbb');
    assert(view.c === 'ccc');
  });
});

describe('collection > view .use', function() {
  beforeEach(function() {
    app = new App();
  });

  it('should pass plugins down to views', function(cb) {
    var count = 0;
    app.create('pages');
    app.pages.use(function(inst) {
      return function(view) {
        count++;
        view.count = count;
      };
    });
    app.pages.addView('foo', {content: 'this is content'});
    var view = app.pages.getView('foo');
    assert.equal(view.count, 1);
    cb();
  });

  it('should pass plugins down to views after a view is created', function(cb) {
    var count = 0;

    app.create('pages');
    app.pages.addView('foo', {content: 'this is content'});
    app.pages.addView('bar', {content: 'this is content'});
    app.pages.addView('baz', {content: 'this is content'});

    // add plugin after adding views...
    app.pages.use(function(inst) {
      return function(view) {
        count++;
        view.count = count;
      };
    });

    assert.equal(app.pages.getView('foo').count, 1);
    assert.equal(app.pages.getView('bar').count, 2);
    assert.equal(app.pages.getView('baz').count, 3);
    assert.equal(count, 3);
    cb();
  });
});
