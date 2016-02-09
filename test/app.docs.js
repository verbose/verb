'use strict';

require('mocha');
require('should');
var assert = require('assert');
var verb = require('..');
var app;

describe('app', function() {
  beforeEach(function() {
    app = verb();
    app.create('docs');
  });

  describe('add docs', function() {
    it('should add docs to `app.views.docs`:', function() {
      app.docs({
        'a.hbs': {path: 'a.hbs', content: 'a'},
        'b.hbs': {path: 'b.hbs', content: 'b'},
        'c.hbs': {path: 'c.hbs', content: 'c'},
      });
      assert(Object.keys(app.views.docs).length === 3);
    });
  });
});
