'use strict';

require('mocha');
require('should');
var assert = require('assert');
var Verb = require('..');
var app;

describe('app.pages', function() {
  beforeEach(function() {
    app = new Verb({cli: true, cwd: process.cwd()});
    app.create('pages');
  });

  describe('add pages', function() {
    it('should add pages to `app.views.pages`', function() {
      app.pages({
        'a.hbs': {path: 'a.hbs', contents: new Buffer('a')},
        'b.hbs': {path: 'b.hbs', contents: new Buffer('b')},
        'c.hbs': {path: 'c.hbs', contents: new Buffer('c')},
      });
      assert.equal(Object.keys(app.views.pages).length, 3);
    });
  });

  describe('load pages', function() {
    it('should load pages onto `app.views.pages`', function() {
      app.pages('test/fixtures/pages/*.hbs');
      assert.equal(Object.keys(app.views.pages).length, 3);
    });
  });
});
