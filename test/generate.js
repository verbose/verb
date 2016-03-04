'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Generate = require('..');
var generate;

describe('generate', function() {
  describe('cwd', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should get the current working directory', function() {
      assert.equal(generate.cwd, process.cwd());
    });

    it('should set the current working directory', function() {
      generate.cwd = 'test/fixtures';
      assert.equal(generate.cwd, path.join(process.cwd(), 'test/fixtures'));
    });
  });

  describe('generator', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should register the default generator', function() {
      generate.register('default', require('./fixtures/def-gen'));
      assert(generate.hasGenerator('default'));
    });
  });
});
