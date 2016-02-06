'use strict';

require('mocha');
var assert = require('assert');
var Generate = require('..');
var generate;

describe('cache', function() {
  describe('set', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should set an instance', function() {
      generate.generators.set('foo', function() {});
      assert(generate.generators.hasOwnProperty('foo'));
    });

    it('should set an instance with a parent instance', function() {
      generate.generators.set('foo', function() {}, generate);
      assert(generate.generators.hasOwnProperty('foo'));
    });
  });

  describe('get', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should get an instance from app.generators', function() {
      generate.generators.set('foo', function() {}, generate);
      var foo = generate.generators.get('foo');
      assert(foo);
      assert(foo.isGenerator);
    });
  });
});
