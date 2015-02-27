/*!
 * verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('helpers', function () {
  beforeEach(function (done) {
    verb = new verb.Verb();
    verb.engine('*', require('engine-lodash'));
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
        content.should.match(/verb/i);
        done();
      });
    });

    it('should use the `docs` helper to get files without extension:', function (done) {
      verb.render('{%= docs("README") %}', function (err, content) {
        if (err) console.log(err);
        content.should.match(/verb/i);
        done();
      });
    });

    it('should use the `docs` helper to get files with extension:', function (done) {
      verb.render('{%= docs("README.md") %}', function (err, content) {
        if (err) console.log(err);
        content.should.match(/verb/i);
        done();
      });
    });

    it('should change the directory for the `docs` helper', function (done) {
      verb.render('{%= docs("a.md", {cwd: "test/fixtures/auto-loading"}) %}', function (err, content) {
        if (err) console.log(err);
        content.should.match(/fixture/i);
        done();
      });
    });

    it('should use the `include` helper:', function (done) {
      verb.render('{%= include("author") %}', function (err, content) {
        if (err) console.log(err);
        content.should.match(/\*\*Jon\s*Schlinkert\*\*/i);
        done();
      });
    });
  });
});
