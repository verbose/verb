'use strict';

require('mocha');
require('should');
var assert = require('assert');
var generate = require('..');
var app;

describe('app', function() {
  beforeEach(function() {
    app = generate();
    app.create('docs');
  });

  describe('add doc', function() {
    it('should add docs to `app.views.docs`:', function() {
      app.doc('a.hbs', {path: 'a.hbs', content: 'a'});
      app.doc('b.hbs', {path: 'b.hbs', content: 'b'});
      app.doc('c.hbs', {path: 'c.hbs', content: 'c'});
      assert(Object.keys(app.views.docs).length === 3);
    });
  });
});
