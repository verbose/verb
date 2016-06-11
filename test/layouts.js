'use strict';

require('mocha');
require('should');
var each = require('async-each');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var app;

describe('layouts', function() {
  beforeEach(function() {
    app = new App();
    app.engine('tmpl', require('engine-base'));
    app.create('layout', { viewType: 'layout' });
    app.create('partial', { viewType: 'partial' });
    app.create('page');
  });

  it('should add a layout to a view:', function(cb) {
    app.layout('base', {path: 'base.tmpl', content: 'a {% body %} c'});
    app.pages('a.tmpl', {path: 'a.tmpl', content: 'b', layout: 'base'});
    var page = app.pages.getView('a.tmpl');

    app.render(page, function(err, view) {
      if (err) return cb(err);
      assert.equal(typeof view.content, 'string');
      assert.equal(view.content, 'a b c');
      cb();
    });
  });

  it('should use a "default" layout defined on global options', function(cb) {
    app.option('layout', 'base');

    app.layout('base', {path: 'base.tmpl', content: 'a {% body %} c'});
    app.page('a.tmpl', {path: 'a.tmpl', content: 'b'})
      .render(function(err, view) {
        if (err) return cb(err);
        assert.equal(typeof view.content, 'string');
        assert.equal(view.content, 'a b c');
        cb();
      });
  });

  it('should use a "default" layout defined on collection options', function(cb) {
    app.pages.option('layout', 'base');

    app.layout('base', {path: 'base.tmpl', content: 'a {% body %} c'});
    app.page('a.tmpl', {path: 'a.tmpl', content: 'b'})
      .render(function(err, view) {
        if (err) return cb(err);
        assert.equal(typeof view.content, 'string');
        assert.equal(view.content, 'a b c');
        cb();
      });
  });

  it('should use the "default" layout on layouts', function(cb) {
    app.option('layout', 'base');

    app.layout('base', {path: 'base.tmpl', content: 'a {% body %} c'});
    var foo = app.layout('foo.tmpl', {content: 'b'});

    app.render(foo, function(err, view) {
      if (err) return cb(err);
      assert.equal(typeof view.content, 'string');
      assert.equal(view.content, 'a b c');
      cb();
    });
  });

  it('should not use the "default" layout on partials', function(cb) {
    app.option('layout', 'base');

    app.partial('foo.tmpl', {content: 'c'});
    app.layout('base.tmpl', {content: 'a {% body %} d'});

    app.page('a.tmpl', {path: 'a.tmpl', content: 'b <%= partial("foo") %>'})
      .render(function(err, view) {
        if (err) return cb(err);
        assert.equal(typeof view.content, 'string');
        assert.equal(view.content, 'a b c d');
        cb();
      });
  });

  it('should add a layout to a partial when defined on a partial', function(cb) {
    app.option('layout', 'base');

    app.partial('foo.tmpl', {content: 'c', layout: 'base'});
    app.layout('base.tmpl', {content: 'a {% body %} d'});

    app.page('a.tmpl', {path: 'a.tmpl', content: 'b <%= partial("foo") %>'})
      .render(function(err, view) {
        if (err) return cb(err);
        assert.equal(typeof view.content, 'string');
        assert.equal(view.content, 'a b a c d d');
        cb();
      });
  });

  it('should add a layout to a layout when defined on a layout', function(cb) {
    app.option('layout', 'base');

    app.partial('foo.tmpl', {content: 'c'});
    app.layout('default.tmpl', {content: 'x {% body %} z'});
    app.layout('base.tmpl', {content: 'a {% body %} d', layout: 'default'});

    app.page('a.tmpl', {path: 'a.tmpl', content: 'b <%= partial("foo") %>'})
      .render(function(err, view) {
        if (err) return cb(err);
        assert.equal(typeof view.content, 'string');
        assert.equal(view.content, 'x a b c d z');
        cb();
      });
  });

  it('should not add a layout when `layoutApplied` is set:', function(cb) {
    app.layout('base', {path: 'base.tmpl', content: 'a {% body %} c'});
    app.pages('a.tmpl', {path: 'a.tmpl', content: 'b', layout: 'base'});
    var page = app.pages.getView('a.tmpl');
    page.option('layoutApplied', true);

    app.render(page, function(err, view) {
      if (err) return cb(err);
      assert.equal(typeof view.content, 'string');
      assert.equal(view.content, 'b');
      cb();
    });
  });

  it('should not apply a layout to itself:', function(cb) {
    app.layout('base', {path: 'base.tmpl', content: 'a {% body %} c', layout: 'base'});
    app.pages('a.tmpl', {path: 'a.tmpl', content: 'b', layout: 'base'});
    var page = app.pages.getView('a.tmpl');

    app.render(page, function(err, view) {
      if (err) return cb(err);
      assert.equal(typeof view.content, 'string');
      assert.equal(view.content, 'a b c');
      cb();
    });
  });

  it('should apply nested layouts to a view:', function(cb) {
    app.layout('a', {path: 'a.tmpl', content: 'a {% body %} a', layout: 'b'});
    app.layout('b', {path: 'b.tmpl', content: 'b {% body %} b', layout: 'c'});
    app.layout('c', {path: 'c.tmpl', content: 'c {% body %} c', layout: 'base'});
    app.layout('base', {path: 'base.tmpl', content: 'outter {% body %} outter'});

    app.pages('z.tmpl', {path: 'a.tmpl', content: 'inner', layout: 'a'});
    var page = app.pages.getView('z.tmpl');

    app.render(page, function(err, view) {
      if (err) return cb(err);
      assert.equal(typeof view.content, 'string');
      assert.equal(view.content, 'outter c b a inner a b c outter');
      cb();
    });
  });

  it('should apply nested layouts to multiple views when layout is defined on data property:', function(cb) {
    app.layout('a', {path: 'a.tmpl', content: 'a {% body %} a', data: { layout: 'b' }});
    app.layout('b', {path: 'b.tmpl', content: 'b {% body %} b', data: { layout: 'c' }});
    app.layout('c', {path: 'c.tmpl', content: 'c {% body %} c', data: { layout: 'base' }});
    app.layout('base', {path: 'base.tmpl', content: 'outter {% body %} outter'});

    app.pages('x.tmpl', {path: 'x.tmpl', content: 'x inner x', data: { layout: 'a' }});
    app.pages('y.tmpl', {path: 'y.tmpl', content: 'y inner y', data: { layout: 'a' }});
    app.pages('z.tmpl', {path: 'z.tmpl', content: 'z inner z', data: { layout: 'a' }});

    each(['x', 'y', 'z'], function(key, next) {
      var page = app.pages.getView(key + '.tmpl');
      app.render(page, function(err, view) {
        if (err) return next(err);
        assert.equal(typeof view.content, 'string');
        assert.equal(view.content, 'outter c b a ' + key + ' inner ' + key + ' a b c outter');
        next();
      });
    }, cb);
  });

  it('should track layout stack history on `layoutStack`:', function(cb) {
    app.layout('a', {path: 'a.tmpl', content: 'a {% body %} a', layout: 'b'});
    app.layout('b', {path: 'b.tmpl', content: 'b {% body %} b', layout: 'c'});
    app.layout('c', {path: 'c.tmpl', content: 'c {% body %} c', layout: 'base'});
    app.layout('base', {path: 'base.tmpl', content: 'outter {% body %} outter'});

    app.pages('z.tmpl', {path: 'a.tmpl', content: 'inner', layout: 'a'});
    var page = app.pages.getView('z.tmpl');

    app.render(page, function(err, view) {
      if (err) return cb(err);
      assert(view.layoutStack.length === 4);
      assert(typeof view.layoutStack[0] === 'object');
      assert(typeof view.layoutStack[0].depth === 'number');
      cb();
    });
  });

  it('should track layout stack history on `layoutStack`:', function(cb) {
    app.layout('a', {path: 'a.tmpl', content: 'a {% body %} a', layout: 'b'});
    app.layout('b', {path: 'b.tmpl', content: 'b {% body %} b', layout: 'c'});
    app.layout('c', {path: 'c.tmpl', content: 'c {% body %} c', layout: 'base'});
    app.layout('base', {path: 'base.tmpl', content: 'outter {% body %} outter'});

    app.pages('z.tmpl', {path: 'a.tmpl', content: 'inner', layout: 'a'});
    var page = app.pages.getView('z.tmpl');

    app.render(page, function(err, view) {
      if (err) return cb(err);
      assert.equal(typeof view.content, 'string');
      assert.equal(view.content, 'outter c b a inner a b c outter');
      cb();
    });
  });

  it('should get layouts from `layout` viewTypes:', function(cb) {
    app.create('section', { viewType: 'layout' });
    app.create('block', { viewType: 'layout' });

    app.section('a', {path: 'a.tmpl', content: 'a {% body %} a', layout: 'b'});
    app.block('b', {path: 'b.tmpl', content: 'b {% body %} b', layout: 'c'});
    app.section('c', {path: 'c.tmpl', content: 'c {% body %} c', layout: 'base'});
    app.block('base', {path: 'base.tmpl', content: 'outter {% body %} outter'});

    app.pages('z.tmpl', {path: 'a.tmpl', content: 'inner', layout: 'a'});
    var page = app.pages.getView('z.tmpl');

    app.render(page, function(err, view) {
      if (err) return cb(err);
      assert.equal(typeof view.content, 'string');
      assert.equal(view.content, 'outter c b a inner a b c outter');
      cb();
    });
  });
});
