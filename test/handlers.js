'use strict';

var path = require('path');
var assert = require('assert');
var should = require('should');
var rimraf = require('rimraf');
var File = require('vinyl');
var support = require('./support');
var App = support.resolve();
var app;

describe('handlers', function() {
  describe('custom handlers', function() {
    beforeEach(function() {
      app = new App();
      app.create('page');
    });

    it('should add custom middleware handlers:', function() {
      app.handler('foo');
      app.handler('bar');

      app.pages.use(function() {
        return function(view) {
          app.handle('foo', view);
          app.handle('bar', view);
        };
      });

      app.foo(/a/, function(view, next) {
        view.one = 'aaa';
        next();
      });

      app.bar(/z/, function(view, next) {
        view.two = 'zzz';
        next();
      });

      app.pages('a.txt', {content: 'aaa'});
      app.pages('z.txt', {content: 'zzz'});

      app.pages.getView('a.txt').should.have.property('one');
      app.pages.getView('a.txt').should.not.have.property('two');

      app.pages.getView('z.txt').should.not.have.property('one');
      app.pages.getView('z.txt').should.have.property('two');
    });
  });

  describe('stream', function() {
    beforeEach(function() {
      app = new App();
    });

    afterEach(function(cb) {
      rimraf(path.join(__dirname, './out-fixtures/'), cb);
    });

    it('should handle onLoad', function(cb) {
      var count = 0;
      app.onLoad(/./, function(file, next) {
        count++;
        next();
      });

      app.src(path.join(__dirname, './fixtures/vinyl/test.coffee'))
        .pipe(app.dest('./out-fixtures/', {cwd: __dirname}))
        .on('end', function() {
          assert.equal(count, 1);
          cb();
        });
    });

    it('should handle preWrite', function(cb) {
      var count = 0;
      app.preWrite(/./, function(file, next) {
        count++;
        next();
      });

      var srcPath = path.join(__dirname, './fixtures/vinyl/test.coffee');
      var stream = app.dest('./out-fixtures/', {
        cwd: __dirname
      });

      stream.once('finish', function() {
        assert.equal(count, 1);
        cb();
      });

      var file = new File({
        path: srcPath,
        cwd: __dirname,
        contents: new Buffer("1234567890")
      });
      file.options = {};

      stream.write(file);
      stream.end();
    });

    it('should handle postWrite', function(cb) {
      var count = 0;
      app.postWrite(/./, function(file, next) {
        count++;
        next();
      });

      var srcPath = path.join(__dirname, './fixtures/vinyl/test.coffee');
      var stream = app.dest('./out-fixtures/', {
        cwd: __dirname
      });

      stream.once('finish', function() {
        assert.equal(count, 1);
        cb();
      });

      var file = new File({
        path: srcPath,
        cwd: __dirname,
        contents: new Buffer("1234567890")
      });
      file.options = {};

      stream.write(file);
      stream.end();
    });
  });
});
