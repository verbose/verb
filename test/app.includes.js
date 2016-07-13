'use strict';

require('mocha');
require('should');
var assert = require('assert');
var generate = require('..');
var app, len;

describe('app', function() {
  beforeEach(function() {
    app = generate();
    if (typeof app.include === 'undefined') {
      app.create('include');
    }
    len = Object.keys(app.views.includes).length;
  });

  describe('add includes', function() {
    it('should add includes to `app.views.includes`:', function() {
      app.includes({
        'a.hbs': {path: 'a.hbs', content: 'a'},
        'b.hbs': {path: 'b.hbs', content: 'b'},
        'c.hbs': {path: 'c.hbs', content: 'c'}
      });
      assert((Object.keys(app.views.includes).length - len) === 3);
    });
  });
});
