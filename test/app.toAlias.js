'use strict';

require('mocha');
var assert = require('assert');
require('generate-foo/generator.js');
var Verb = require('..');
var verb;

describe('.toAlias', function() {
  beforeEach(function() {
    verb = new Verb();
    delete verb.toAlias;
  });

  it('should not create an alias from a name without a prefix', function() {
    assert.equal(verb.toAlias('foo-bar'), 'foo-bar');
  });

  it('should create an alias using the given prefix', function() {
    assert.equal(verb.toAlias('foo-bar', {prefix: 'foo'}), 'bar');
  });

  it('should create an alias using the given alias function', function() {
    var alias = verb.toAlias('one-two-three', {
      alias: function(name) {
        return name.slice(name.lastIndexOf('-') + 1);
      }
    });
    assert.equal(alias, 'three');
  });
});
