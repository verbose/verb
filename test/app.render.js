'use strict';

require('mocha');
require('should');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var app;

describe('app.render', function() {
  beforeEach(function() {
    app = new App();
    app.engine('hbs', require('engine-handlebars'));
    app.engine('tmpl', require('engine-base'));
    app.create('partials', {viewType: 'partial'});
    app.create('page');
  });

  it('should throw an error when no callback is given:', function(cb) {
    try {
      app.render();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'Templates#render is async and expects a callback function');
      cb();
    }
  });

  it('should throw an error when an engine is not defined:', function(cb) {
    app.page('foo.bar', {content: '<%= name %>'});
    var page = app.pages.getView('foo.bar');

    app.render(page, function(err) {
      assert(err.message === 'Templates#render cannot find an engine for: .bar');
      cb();
    });
  });

  it('should use helpers to render a view:', function(cb) {
    var locals = {name: 'Halle'};

    app.helper('upper', function(str) {
      return str.toUpperCase(str);
    });

    app.page('a.tmpl', {content: 'a <%= upper(name) %> b', locals: locals});
    var page = app.pages.getView('a.tmpl');

    app.render(page, function(err, res) {
      if (err) return cb(err);

      assert(res.contents.toString() === 'a HALLE b');
      cb();
    });
  });

  it('should use global app data in template.', function(cb) {
    app.data({name: 'CCC'});
    app.page('a.tmpl', {content: 'a <%= name %> b'});
    app.render('a.tmpl', function(err, res) {
      if (err) return cb(err);
      res.content.should.equal('a CCC b');
      cb();
    });
  });

  it('should use page data in template.', function(cb) {
    app.data({name: 'CCC'});
    app.page('a.tmpl', {content: 'a <%= name %> b', data: {name: 'DDD'}});
    app.render('a.tmpl', function(err, res) {
      if (err) return cb(err);
      res.content.should.equal('a DDD b');
      cb();
    });
  });

  it('should use passed in locals in template.', function(cb) {
    app.data({name: 'CCC'});
    app.page('a.tmpl', {content: 'a <%= name %> b', data: {name: 'DDD'}});
    app.render('a.tmpl', {name: 'EEE'}, function(err, res) {
      if (err) return cb(err);
      res.content.should.equal('a EEE b');
      cb();
    });
  });

  it('should render the same template twice with a helper', function(cb) {
    app.partial('button.tmpl', {content: '<%= name %>'});
    app.page('a.tmpl', {content: 'a <%= partial("button.tmpl", {name: "foo"}) %> <%= partial("button.tmpl", {name: "bar"}) %> b'});

    app.pages.getView('a.tmpl')
      .render(function(err, res) {
        if (err) return cb(err);
        assert.equal(res.content, 'a foo bar b');
        cb();
      });
  });

  it('should render the same template multiple times with different engines', function(cb) {
    app.partial('button.tmpl', {content: '<%= name %>'});
    app.partial('foo.hbs', {content: '{{name}}'});

    app.page('a.hbs', {content: 'a <%= partial("button.tmpl", {name: "foo"}) %> <%= partial("button.tmpl", {name: "bar"}) %> {{partial "foo.hbs" name="one"}} {{partial "foo.hbs" name="two"}} b'});

    var view = app.pages.getView('a.hbs');

    app.render(view, function(err, res) {
      if (err) return cb(err);

      res.engine = 'tmpl';

      app.render(res, function(err, res) {
        if (err) return cb(err);
        assert.equal(res.content, 'a foo bar one two b');
        cb();
      });
    });
  });

  it('should render the same template multiple times with different engines', function(cb) {
    app.partial('button.tmpl', {content: '{{title}}', engine: 'hbs'});
    app.partial('foo.hbs', {content: '{{title}}'});

    app.page('a.hbs', {
      content: 'a <%= partial("button.tmpl", {title: "foo"}) %> <%= partial("button.tmpl", {title: "bar"}) %> {{partial "foo.hbs" title="one"}} {{partial "foo.hbs" title="two"}} b'
    });

    var view = app.pages.getView('a.hbs');

    app.render(view, function(err, res) {
      if (err) return cb(err);

      res.engine = 'tmpl';

      app.render(res, function(err, res) {
        if (err) return cb(err);
        assert.equal(res.content, 'a foo bar one two b');
        cb();
      });
    });
  });

  it('should use helpers when rendering a view:', function(cb) {
    var locals = {name: 'Halle'};
    app.helper('upper', function(str) {
      return str.toUpperCase(str);
    });

    app.page('a.tmpl', {content: 'a <%= upper(name) %> b', locals: locals});
    var page = app.pages.getView('a.tmpl');

    app.render(page, function(err, res) {
      if (err) return cb(err);
      assert(res.contents.toString() === 'a HALLE b');
      cb();
    });
  });

  it('should render a template when contents is a buffer:', function(cb) {
    app.pages('a.tmpl', {content: '<%= a %>', locals: {a: 'b'}});
    var view = app.pages.getView('a.tmpl');

    app.render(view, function(err, view) {
      if (err) return cb(err);
      assert(view.contents.toString() === 'b');
      cb();
    });
  });

  it('should render a template when content is a string:', function(cb) {
    app.pages('a.tmpl', {content: '<%= a %>', locals: {a: 'b'}});
    var view = app.pages.getView('a.tmpl');

    app.render(view, function(err, view) {
      if (err) return cb(err);
      assert(view.contents.toString() === 'b');
      cb();
    });
  });
});
