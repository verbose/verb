/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('middleware', function () {
  var orig = process.cwd();
  beforeEach(function (done) {
    before(function () {
      process.chdir(__dirname + '/fixtures');
    });

    after(function () {
      process.chdir(orig);
    });

    verb.engine('md', require('engine-lodash'));
    verb.option('cwd', __dirname);
    verb.data({'__dirname': verb.option('cwd')});
    done();
  });

  describe('table of contents:', function () {
    it('should generate a markdown table of contents for a `doc`:', function (done) {
      verb.doc('*.md', {cwd: __dirname + '/middleware'});
      verb.views.docs.should.have.property('toc');

      verb.render('toc', function (err, content) {
        if (err) console.log(err);
        content.should.match(/<\!-- tocstop -->/);
        done();
      });
    });

    it('should generate a markdown table of contents for an `include`:', function (done) {
      verb.include('*.md', {cwd: __dirname + '/middleware'});
      verb.views.includes.should.have.property('toc');

      verb.render('toc', function (err, content) {
        if (err) console.log(err);
        content.should.match(/<\!-- tocstop -->/);
        done();
      });
    });

    it('should generate a markdown table of contents for a `src` file:', function (done) {
      verb.src('test/middleware/*.md')
        .on('data', function (file) {
          file.contents.toString().should.match(/<\!-- tocstop -->/);
        })
        .on('end', done);
    });
  });

  describe('copyright:', function () {
    it('should add copyright data to the context:', function (done) {
      verb.src('test/middleware/*.js')
        .on('data', function (file) {
          verb.cache.data.should.have.property('copyright');
        })
        .on('end', done);
    });
  });
});
