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
    verb = new verb.Verb();
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

  describe('todos:', function () {
    it('should add a todos list to a markdown file\'s `todos` property:', function (done) {
      verb.src('test/fixtures/middleware/todo.md')
        .on('data', function (file) {
          if (/\/todo\.md$/.test(file.path)) {
            file.todos.should.be.an.array;
          }
        })
        .on('end', done);
    });

    it('should add a todos list to a javascript file\'s `todos` property:', function (done) {
      verb.src('test/fixtures/middleware/todo.js')
        .on('data', function (file) {
          if (/\/todo\.js$/.test(file.path)) {
            file.todos.should.be.an.array;
          }
        })
        .on('end', done);
    });
  });

  describe('multi-toc:', function () {
    it('should generate a multi-file table of contents:', function (done) {
      verb.doc('multi-toc.md', {cwd: __dirname + '/fixtures/middleware'});
      verb.views.docs.should.have.property('multi-toc');

      verb.render('multi-toc', function (err, content) {
        if (err) console.log(err);
        content.should.match(/docs\/_verb\/[^\/]+\/#/);
        done();
      });
    });

    it('should strip the toc comment marker from the generated file:', function (done) {
      verb.doc('multi-toc.md', {cwd: __dirname + '/fixtures/middleware'});
      verb.views.docs.should.have.property('multi-toc');

      verb.render('multi-toc', function (err, content) {
        if (err) console.log(err);
        content.should.not.match(/<!-- toc/);
        done();
      });
    });

    it('should use options defined as the second argument:', function (done) {
      verb.doc('multi-toc-options.md', {cwd: __dirname + '/fixtures/middleware'});
      verb.views.docs.should.have.property('multi-toc-options');

      verb.render('multi-toc-options', function (err, content) {
        if (err) console.log(err);
        content.should.match(/## \[AAA\]/);
        content.should.match(/## \[BBB\]/);
        done();
      });
    });
  });

  describe('toc:', function () {
    it('should generate a table of contents:', function (done) {
      verb.doc('toc.md', {cwd: __dirname + '/fixtures/middleware'});
      verb.views.docs.should.have.property('toc');

      verb.render('toc', function (err, content) {
        if (err) console.log(err);
        content.should.match(/<\!-- tocstop -->/);
        done();
      });
    });

    it('should generate a markdown table of contents for an `include`:', function (done) {
      verb.include('*.md', {cwd: __dirname + '/fixtures/middleware'});
      verb.views.includes.should.have.property('toc');

      verb.render('toc', function (err, content) {
        if (err) console.log(err);
        content.should.match(/<\!-- tocstop -->/);
        done();
      });
    });

    it('should add a toc to a file\'s `toc` property:', function (done) {
      verb.src('test/fixtures/middleware/toc.md')
        .on('data', function (file) {
          if (/\/toc\.md$/.test(file.path)) {
            console.log(file.toc)
            file.toc.should.be.a.string;
          }
        })
        .on('end', done);
    });

    it('should generate a markdown table of contents for a `src` file:', function (done) {
      verb.src('test/fixtures/middleware/toc.md')
        .on('data', function (file) {
          if (/\/toc\.md$/.test(file.path)) {
            file.contents.toString().should.match(/<\!-- tocstop -->/);
          }
        })
        .on('end', done);
    });
  });

  describe('copyright:', function () {
    it('should add copyright data to the context:', function (done) {
      verb.src('test/fixtures/middleware/copyright.js')
        .on('data', function (file) {
          verb.cache.data.should.have.property('copyright');
        })
        .on('end', done);
    });
  });
});
