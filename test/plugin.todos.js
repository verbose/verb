/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe.skip('default helpers:', function () {
  var orig = process.cwd();

  beforeEach(function (done) {
    before(function () {
      process.chdir(__dirname + '/fixtures');
    });

    after(function () {
      process.chdir(orig);
    });

    verb = new verb.Verb();
    verb.engine('*', require('engine-lodash'));
    verb.option('cwd', __dirname);
    verb.data({'__dirname': verb.option('cwd')});
    done();
  });

  describe('todos:', function () {
    it('should add todos to `file.todos` for markdown files:', function (done) {
      verb.doc('abc.md', {cwd: __dirname + '/fixtures/todos'});
      verb.views.docs.should.have.property('abc');

      verb.render('abc', function (err, content) {
        if (err) console.log(err);
        // verb.cache.data.should.have.property('todos');
        done();
      });
    });

    // it('should generate a list of todos:', function (done) {
    //   verb.doc('abc.md', {cwd: __dirname + '/fixtures/todos'});
    //   verb.doc('xyz.js', {cwd: __dirname + '/fixtures/todos'});
    //   verb.views.docs.should.have.property('abc');
    //   verb.views.docs.should.have.property('xyz');
    //   console.log(verb.views.docs.xyz)
    // });
    // stream.write(new File({
    //   base: __dirname,
    //   path: __dirname + '/post.md'
    // }));

    // stream.on('data', function (file) {
    //   buffer.push(file);
    // });

    // stream.on('end', function () {
    //   assert.equal(buffer.length, 1);
    //   assert.equal(buffer[0].relative, 'post.md');
    //   cb();
    // });
    // stream.end();
    // it('should strip the toc marker from the generated file:', function (done) {
    //   verb.doc('todos.md', {cwd: __dirname + '/fixtures/middleware'});
    //   verb.views.docs.should.have.property('todos');

    //   verb.render('todos', function (err, content) {
    //     if (err) console.log(err);
    //     content.should.not.match(/<!-- toc\("docs\/\*\.md"\) -->/);
    //     done();
    //   });
    // });
  });
});
