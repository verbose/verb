/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps: mocha lodash swig template */
require('should');
var Verb = require('..');
var orig = process.cwd();
var verb;

describe('built-in helpers', function () {
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });

  after(function () {
    process.chdir(orig);
  });

  beforeEach(function (cb) {
    verb = new Verb.Verb();

    verb.engine('*', require('engine-lodash'));
    verb.option('cwd', __dirname + '/fixtures');
    verb.data({'__dirname': verb.option('cwd')});
    cb();
  });

  describe('when automatically generated helpers are used:', function () {
    it.only('should use them in templates:', function (cb) {
      verb.helper('upper', function (str) {
        return str.toUpperCase();
      });

      verb.render('{%= upper(name) %}', {name: 'Jon Schlinkert'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('JON SCHLINKERT');
        cb();
      });
    });
  });

  describe('apidocs helper:', function () {
    it('should use the `apidocs` helper:', function (cb) {
      var str = '{%= apidocs("apidocs-comments.js") %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/apidocs-comments.js#L/i);
        cb();
      });
    });
  });

  describe('badge helper:', function () {
    it('should use the `badge` helper:', function (cb) {
      verb.render('{%= badge("travis") %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal(' [![Build Status](https://travis-ci.org/assemble/verb.svg)](https://travis-ci.org/assemble/verb) ');
        cb();
      });
    });

    it('should use context pass to the helper:', function (cb) {
      var str = '{%= badge("travis", {travis_url: "https://travis-ci.org/foo/bar"}) %}';
      var expected = ' [![Build Status](https://travis-ci.org/foo/bar.svg)](https://travis-ci.org/foo/bar) ';

      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.equal(expected);
        cb();
      });
    });
  });

  describe('include:', function () {
    it('should use the `include` helper:', function (cb) {
      verb.render('{%= include("tests") %}', function (err, content) {
        if (err) console.log(err);
        content.should.match(/Install dev dependencies:/i);
        cb();
      });
    });

    describe('escaping:', function () {
      it('should not try to render escaped templates', function (cb) {
        verb.page('foo.md', {content: '{%%= include("tests") %}'});
        verb.render('foo.md', function (err, content) {
          if (err) console.log(err);
          content.should.equal('{%= include("tests") %}');
          cb();
        });
      });
    });

    it('should support using `includes` as deeply nested includes:', function (cb) {
      verb.include('one', {content: '{%= include("a", {cwd: "auto-loading"}) %}'});
      verb.include('two', {content: 'c {%= include("one") %} d'});
      verb.include('three', {content: 'b {%= include("two") %} e'});
      verb.include('four', {content: 'a {%= include("three") %} f'});

      verb.render('four', function (err, content) {
        if (err) console.log(err);
        content.should.match(/a b c # this is a fixture d e f/i);
        cb();
      });
    });
  });

  describe('docs:', function () {
    it('should use the `docs` helper to get files without extension:', function (cb) {
      var str = '{%= docs("README", {cwd: __dirname + "/templates"}) %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/Success!/i);
        cb();
      });
    });

    it('should use the `docs` helper to get files with extension:', function (cb) {
      var str = '{%= docs("README", {cwd: __dirname + "/templates"}) %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/Success!/i);
        cb();
      });
    });

    it('should use the `docs` helper to get files with extension:', function (cb) {
      var str = '{%= docs("README.md", {cwd: __dirname + "/templates"}) %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/Success!/i);
        cb();
      });
    });

    it('should support using `doc` as deeply nested includes:', function (cb) {
      verb.doc('one.md', {content: '{%= docs("a.md", {cwd: "auto-loading"}) %}'});
      verb.doc('two.md', {content: 'c {%= docs("one.md") %} d'});
      verb.doc('three.md', {content: 'b {%= docs("two.md") %} e'});
      verb.doc('four.md', {content: 'a {%= docs("three.md") %} f'});

      verb.render('four', function (err, content) {
        if (err) console.log(err);
        content.should.match(/a b c # this is a fixture d e f/i);
        cb();
      });
    });
  });
});
