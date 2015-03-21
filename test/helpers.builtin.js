/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
var orig = process.cwd();
require('should');

describe('built-in helpers', function () {
  describe('when automatically generated helpers are used:', function () {
    it('should use them in templates:', function (done) {
      verb.helper('upper', function (str) {
        return str.toUpperCase();
      });

      verb.render('{%= upper(name) %}', {name: 'Jon Schlinkert'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('JON SCHLINKERT');
        done();
      });
    });
  });
});

describe('default helpers:', function () {
  verb = new verb.Verb();

  beforeEach(function (done) {
    before(function () {
      process.chdir(__dirname + '/fixtures');
    });

    after(function () {
      process.chdir(orig);
    });

    verb.engine('md', require('engine-lodash'));
    verb.option('cwd', __dirname + '/fixtures');
    verb.data({'__dirname': verb.option('cwd')});
    done();
  });

  describe('apidocs helper:', function () {
    it('should use the `apidocs` helper:', function (done) {
      var str = '{%= apidocs("apidocs-comments.js", {cwd: "test/fixtures"}) %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/apidocs-comments.js#L/i);
        done();
      });
    });
  });

  describe('include:', function () {
    it('should use the `include` helper:', function (done) {
      verb.render('{%= include("tests") %}', function (err, content) {
        if (err) console.log(err);
        content.should.match(/Install dev dependencies:/i);
        done();
      });
    });

    describe('escaping:', function () {
      it('should not try to render escaped templates', function (done) {
        verb.page('foo.md', {content: '{%%= include("tests") %}'});
        verb.render('foo.md', function (err, content) {
          if (err) console.log(err);
          content.should.equal('{%= include("tests") %}');
          done();
        });
      });
    });

    it('should support using `includes` as deeply nested includes:', function (done) {
      verb.include('one.md', {
        content: '{%= include("a.md", {cwd: "test/fixtures/auto-loading"}) %}'
      });
      verb.include('two.md', {content: 'c {%= include("one.md") %} d'});
      verb.include('three.md', {content: 'b {%= include("two.md") %} e'});
      verb.include('four.md', {content: 'a {%= include("three.md") %} f'});

      verb.render('four', function (err, content) {
        if (err) console.log(err);
        content.should.match(/a b c # this is a fixture d e f/i);
        done();
      });
    });
  });

  describe('docs:', function () {
    it('should use the `docs` helper to get files without extension:', function (done) {
      var str = '{%= docs("README", {cwd: __dirname + "/templates"}) %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/Success!/i);
        done();
      });
    });

    it('should use the `docs` helper to get files with extension:', function (done) {
      var str = '{%= docs("README.md", {cwd: __dirname + "/templates"}) %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/Success!/i);
        done();
      });
    });

    it('should use the `docs` helper to get files with extension:', function (done) {
      var str = '{%= docs("README.md", {cwd: __dirname + "/templates"}) %}';
      verb.render(str, function (err, content) {
        if (err) console.log(err);
        content.should.match(/Success!/i);
        done();
      });
    });

    it('should support using `doc` as deeply nested includes:', function (done) {
      verb.doc('one.md', {content: '{%= doc("a.md", {cwd: "test/fixtures/auto-loading"}) %}'});
      verb.doc('two.md', {content: 'c {%= doc("one.md") %} d'});
      verb.doc('three.md', {content: 'b {%= doc("two.md") %} e'});
      verb.doc('four.md', {content: 'a {%= doc("three.md") %} f'});

      verb.render('four', function (err, content) {
        if (err) console.log(err);
        content.should.match(/a b c # this is a fixture d e f/i);
        done();
      });
    });

    it('should support using `docs` as deeply nested includes:', function (done) {
      verb.doc('one.md', {content: '{%= docs("a.md", {cwd: "test/fixtures/auto-loading"}) %}'});
      verb.doc('two.md', {content: 'c {%= docs("one.md") %} d'});
      verb.doc('three.md', {content: 'b {%= docs("two.md") %} e'});
      verb.doc('four.md', {content: 'a {%= docs("three.md") %} f'});

      verb.render('four', function (err, content) {
        if (err) console.log(err);
        content.should.match(/a b c # this is a fixture d e f/i);
        done();
      });
    });
  });
});
