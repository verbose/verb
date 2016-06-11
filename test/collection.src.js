'use strict';

var path = require('path');
var assert = require('assert');
var should = require('should');
var App = require('..');
var app, pages, posts;

describe('collection.src()', function() {
  beforeEach(function() {
    app = new App();

    pages = app.create('pages');
    posts = app.create('posts');
  });

  it('should return a stream', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/*.coffee'));
    assert(stream);
    assert.equal(typeof stream.on, 'function');
    assert.equal(typeof stream.pipe, 'function');
    cb();
  });

  it('should convert vinyl files to views', function(cb) {
    var patterns = path.join(__dirname, 'fixtures/*.coffee');
    pages.src(patterns)
      .on('error', cb)
      .on('data', function(file) {
        assert(file.isView);
      })
      .on('end', cb);
  });

  it('should add src files to the collection', function(cb) {
    var patterns = path.join(__dirname, 'fixtures/*.coffee');
    pages.src(patterns)
      .on('error', cb)
      .on('data', function(file) {
        assert(pages.views);
        assert(Object.keys(pages.views).length === 1);
      })
      .on('end', cb);
  });

  it('should work with views added with other methods', function(cb) {
    pages.addView('a', {content: '...'});
    pages.addView('b', {content: '...'});
    pages.addView('c', {content: '...'});

    var patterns = path.join(__dirname, 'fixtures/*.coffee');
    var stream = pages.src(patterns);
    stream.on('error', cb);
    stream.on('data', function(file) {
      assert(pages.views);
      assert(Object.keys(pages.views).length === 4);
    });
    stream.on('end', cb);
  });

  it('should return an input stream from a flat glob', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/*.coffee'));
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.exist(file.contents);
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test.coffee'));
      String(file.contents).should.equal('Hello world!');
    });
    stream.on('end', function() {
      cb();
    });
  });

  it('should return an input stream for multiple globs', function(cb) {
    var globArray = [
      path.join(__dirname, 'fixtures/generic/run.dmc'),
      path.join(__dirname, 'fixtures/generic/test.dmc')
    ];
    var stream = pages.src(globArray);

    var files = [];
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      files.push(file);
    });
    stream.on('end', function() {
      files.length.should.equal(2);
      files[0].path.should.equal(globArray[0]);
      files[1].path.should.equal(globArray[1]);
      cb();
    });
  });

  it('should return an input stream for multiple globs with negation', function(cb) {
    var expectedPath = path.join(__dirname, 'fixtures/generic/run.dmc');
    var globArray = [
      path.join(__dirname, 'fixtures/generic/*.dmc'),
      '!' + path.join(__dirname, 'fixtures/generic/test.dmc'),
    ];
    var stream = pages.src(globArray);

    var files = [];
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      files.push(file);
    });
    stream.on('end', function() {
      files.length.should.equal(1);
      files[0].path.should.equal(expectedPath);
      cb();
    });
  });

  it('should return an input stream with no contents when read is false', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/*.coffee'), {read: false});
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.not.exist(file.contents);
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test.coffee'));
    });
    stream.on('end', function() {
      cb();
    });
  });

  it('should return an input stream with contents as stream when buffer is false', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/*.coffee'), {buffer: false});
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.exist(file.contents);
      var buf = '';
      file.contents.on('data', function(d) {
        buf += d;
      });
      file.contents.on('end', function() {
        buf.should.equal('Hello world!');
        cb();
      });
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test.coffee'));
    });
  });

  it('should return an input stream from a deep glob', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/**/*.jade'));
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.exist(file.contents);
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test/run.jade'));
      String(file.contents).should.equal('test template');
    });
    stream.on('end', function() {
      cb();
    });
  });

  it('should return an input stream from a deeper glob', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/**/*.dmc'));
    var a = 0;
    stream.on('error', cb);
    stream.on('data', function() {
      ++a;
    });
    stream.on('end', function() {
      a.should.equal(2);
      cb();
    });
  });

  it('should return a file stream from a flat path', function(cb) {
    var a = 0;
    var stream = pages.src(path.join(__dirname, 'fixtures/test.coffee'));
    stream.on('error', cb);
    stream.on('data', function(file) {
      ++a;
      should.exist(file);
      should.exist(file.path);
      should.exist(file.contents);
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test.coffee'));
      String(file.contents).should.equal('Hello world!');
    });
    stream.on('end', function() {
      a.should.equal(1);
      cb();
    });
  });

  it('should return a stream', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/*.coffee'));
    should.exist(stream);
    should.exist(stream.on);
    cb();
  });

  it('should return an input stream from a flat glob', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/*.coffee'));
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.exist(file.contents);
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test.coffee'));
      String(file.contents).should.equal('Hello world!');
    });
    stream.on('end', function() {
      cb();
    });
  });

  it('should return an input stream for multiple globs', function(cb) {
    var globArray = [
      path.join(__dirname, 'fixtures/generic/run.dmc'),
      path.join(__dirname, 'fixtures/generic/test.dmc')
    ];
    var stream = pages.src(globArray);

    var files = [];
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      files.push(file);
    });
    stream.on('end', function() {
      files.length.should.equal(2);
      files[0].path.should.equal(globArray[0]);
      files[1].path.should.equal(globArray[1]);
      cb();
    });
  });

  it('should return an input stream for multiple globs, with negation', function(cb) {
    var expectedPath = path.join(__dirname, 'fixtures/generic/run.dmc');
    var globArray = [
      path.join(__dirname, 'fixtures/generic/*.dmc'),
      '!' + path.join(__dirname, 'fixtures/generic/test.dmc'),
    ];
    var stream = pages.src(globArray);

    var files = [];
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      files.push(file);
    });
    stream.on('end', function() {
      files.length.should.equal(1);
      files[0].path.should.equal(expectedPath);
      cb();
    });
  });

  it('should return an input stream with no contents when read is false', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/*.coffee'), {read: false});
    stream.on('error', cb);
    stream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.not.exist(file.contents);
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test.coffee'));
    });
    stream.on('end', function() {
      cb();
    });
  });

  it('should return an input stream from a deep glob', function(cb) {
    pages.src(path.join(__dirname, 'fixtures/**/*.jade'))
      .on('error', cb)
      .on('data', function(file) {
        should.exist(file);
        should.exist(file.path);
        should.exist(file.contents);
        path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test/run.jade'));
        String(file.contents).should.equal('test template');
      })
      .on('end', cb);
  });

  it('should return an input stream from a deeper glob', function(cb) {
    var stream = pages.src(path.join(__dirname, 'fixtures/**/*.dmc'));
    var a = 0;
    stream.on('error', cb);
    stream.on('data', function() {
      ++a;
    });
    stream.on('end', function() {
      a.should.equal(2);
      cb();
    });
  });

  it('should return a file stream from a flat path', function(cb) {
    var a = 0;
    var stream = pages.src(path.join(__dirname, 'fixtures/test.coffee'));
    stream.on('error', cb);
    stream.on('data', function(file) {
      ++a;
      should.exist(file);
      should.exist(file.path);
      should.exist(file.contents);
      path.join(file.path, '').should.equal(path.join(__dirname, 'fixtures/test.coffee'));
      String(file.contents).should.equal('Hello world!');
    });
    stream.on('end', function() {
      a.should.equal(1);
      cb();
    });
  });
});
