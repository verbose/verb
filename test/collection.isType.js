'use strict';

require('mocha');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var View = App.View;
var collection;

describe('collection.isType', function() {
  beforeEach(function() {
    collection = new View();
  });

  it('should expose thie "isType" method', function() {
    assert.equal(typeof collection.isType, 'function');
  });

  it('should return true if a collection is the given "type"', function() {
    assert(collection.isType('renderable'));
  });

  it('should return false if a collection is not the given "type"', function() {
    assert(!collection.isType('partial'));
  });
});
