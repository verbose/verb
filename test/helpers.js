/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License (MIT)
 */

'use strict';

var should = require('should');
var verb = require('..');

describe('helpers', function () {
  beforeEach(function (done) {
    verb = new verb.Verb();
    done();
  });

  describe('when helpers are registered with the `.helper()` method:', function () {
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

  describe('default helpers:', function () {
    it('should use the `comments` helper:', function (done) {
      verb.render('{%= comments("index.js") %}', function (err, content) {
        if (err) console.log(err);
        // if `verb` isn't in index.js, we have a problem
        /verb/i.test(content).should.be.true;
        done();
      });
    });

    it('should use the `docs` helper to get files without extension:', function (done) {
      verb.render('{%= docs("README") %}', function (err, content) {
        if (err) console.log(err);
        /verb/i.test(content).should.be.true;
        done();
      });
    });

    it('should use the `docs` helper to get files with extension:', function (done) {
      verb.render('{%= docs("README.md") %}', function (err, content) {
        if (err) console.log(err);
        /verb/i.test(content).should.be.true;
        done();
      });
    });

    it.skip('should change the directory for the `docs` helper', function (done) {
      verb.render('{%= docs("a.md", {cwd: "test/fixtures"}) %}', function (err, content) {
        if (err) console.log(err);
        console.log(content)
        // /fixture/i.test(content).should.be.true;
        done();
      });
    });

    it('should use the `include` helper:', function (done) {
      verb.render('{%= include("author") %}', function (err, content) {
        if (err) console.log(err);
        /\*\*Jon\s*Schlinkert\*\*/i.test(content).should.be.true;
        done();
      });
    });
  });
});
