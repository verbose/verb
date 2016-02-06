'use strict';

require('mocha');
var assert = require('assert');
require('generate-foo/generator.js');
var Generate = require('..');
var generate;

describe('.toAlias', function() {
  beforeEach(function() {
    generate = new Generate();
  });

  it('should not create an alias from a name without a prefix', function() {
    assert.equal(generate.toAlias('foo-bar'), 'foo-bar');
  });

  it('should create an alias using the given prefix', function() {
    assert.equal(generate.toAlias('foo-bar', {prefix: 'foo'}), 'bar');
  });

  it('should create an alias using the given alias function', function() {
    var alias = generate.toAlias('one-two-three', {
      alias: function(name) {
        return name.slice(name.lastIndexOf('-') + 1);
      }
    });
    assert.equal(alias, 'three');
  });
});
