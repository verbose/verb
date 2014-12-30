/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License (MIT)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var should = require('should');
var consolidate = require('consolidate');
var hbs = require('handlebars'); // keep
var verb = require('..');

describe('verb.render()', function () {
  beforeEach(function (done) {
    verb = new verb.Verb();
    done();
  });

  describe('`this` object:', function () {
    it('should expose `this` to the .render() method:', function (done) {
      verb.render('<%= name %>', {name: 'Jon Schlinkert'}, function (err, content) {
        if (err) console.log(err);
        this.should.have.properties(['cache', 'options', 'engines', 'delims']);
        done();
      });
    });
  });

  describe('when an un-cached string is passed to `.render()`:', function () {
    it('should detect the engine from `ext` (with dot) on locals:', function (done) {
      verb.render('<%= name %>', {name: 'Jon Schlinkert', ext: '.html'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });

    it('should detect the engine from `ext` (without dot) on locals:', function (done) {
      verb.render('<%= name %>', {name: 'Jon Schlinkert', ext: 'html'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });

    it('should detect the engine from `engine` (with dot) on locals:', function (done) {
      verb.render('<%= name %>', {name: 'Jon Schlinkert', engine: '.html'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });

    it('should detect the engine from `engine` (without dot) on locals:', function (done) {
      verb.render('<%= name %>', {name: 'Jon Schlinkert', engine: 'html'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });
  });

  describe('when the name of a cached template is passed to `.render()`:', function () {
    it('should find the template and render it:', function (done) {
      verb.page('aaa.md', '{%= name %}', {name: 'Jon Schlinkert'});

      verb.render('aaa.md', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });

    it('should render the first matching template if dupes are found:', function (done) {
      verb.page('aaa.md', '{%= name %}', {name: 'Brian Woodward'});
      verb.create('post', 'posts', { isRenderable: true });
      verb.post('aaa.md', '{%= name %}', {name: 'Jon Schlinkert'});

      verb.render('aaa.md', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brian Woodward');
        done();
      });
    });
  });

  describe('engine render:', function () {
    it('should determine the engine from the `path` on the given object:', function (done) {
      var file = {path: 'a/b/c.md', content: '{%= name %}', locals: {name: 'Jon Schlinkert'}};

      verb.render(file, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });

    it('should determine the engine from the `path` on the given object:', function (done) {
      var file = {path: 'a/b/c.md', content: '{%= name %}'};

      verb.render(file, {name: 'Jon Schlinkert'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });

    it('should render content with an engine from [consolidate].', function (done) {
      verb.engine('hbs', consolidate.handlebars);
      var hbs = verb.getEngine('hbs');

      hbs.render('{{name}}', {name: 'Jon Schlinkert'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Jon Schlinkert');
        done();
      });
    });

    it('should use `file.path` to determine the correct consolidate engine to render content:', function (done) {
      verb.engine('hbs', consolidate.handlebars);
      verb.engine('swig', consolidate.swig);
      verb.engine('tmpl', consolidate.lodash);

      var files = [
        {path: 'fixture.hbs', content: '<title>{{title}}</title>', locals: {title: 'Handlebars'}},
        {path: 'fixture.tmpl', content: '<title><%= title %></title>', locals: {title: 'Lo-Dash'}},
        {path: 'fixture.swig', content: '<title>{{title}}</title>', locals: {title: 'Swig'}}
      ];

      files.forEach(function(file) {
        verb.render(file, function (err, content) {
          if (err) console.log(err);

          if (file.path === 'fixture.hbs') {
            content.should.equal('<title>Handlebars</title>');
          }
          if (file.path === 'fixture.tmpl') {
            content.should.equal('<title>Lo-Dash</title>');
          }
          if (file.path === 'fixture.swig') {
            content.should.equal('<title>Swig</title>');
          }
        });
      });

      done();
    });

    it('should use the key of a cached template to determine the consolidate engine to use:', function (done) {
      verb.engine('hbs', consolidate.handlebars);
      verb.engine('swig', consolidate.swig);
      verb.engine('tmpl', consolidate.lodash);

      verb.page('a.hbs', {content: '<title>{{title}}</title>', title: 'Handlebars'});
      verb.page('b.tmpl', {content: '<title><%= title %></title>', title: 'Lo-Dash'});
      verb.page('d.swig', {content: '<title>{{title}}</title>', title: 'Swig'});

      Object.keys(verb.views.pages).forEach(function(file) {
        verb.render(file, function (err, content) {
          if (err) console.log(err);

          if (file.path === 'fixture.hbs') {
            content.should.equal('<title>Handlebars</title>');
          }
          if (file.path === 'fixture.tmpl') {
            content.should.equal('<title>Lo-Dash</title>');
          }
          if (file.path === 'fixture.swig') {
            content.should.equal('<title>Swig</title>');
          }
        });
      });

      done();
    });
  });
});
