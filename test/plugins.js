/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var should = require('should');
var Verb = require('..');
var verb;


describe('verb plugins', function () {
  beforeEach(function () {
    verb = new Verb();
  });

  describe('constructor defaults:', function () {
    it('should load `verb-plugin-*` plugins from node_modules.', function () {
      verb.plugins.should.have.property('one');
      verb.plugins.should.have.property('two');
      verb.plugins.should.have.property('three');
    });
  });

  describe('.plugin():', function () {
    it('should run plugins defined with `.plugin()', function () {
      verb
        .plugin(function() {
          this.config = {foo: 'bar'};
        })
        .plugin(function() {
          this.config.bar = 'baz';
        })
        .plugin(function(opts) {
          this.config.fez = opts;
        }, {foo: 'bar'})

      verb.config.should.have.property('foo', 'bar');
      verb.config.should.have.property('bar', 'baz');
      verb.config.should.have.property('fez', {foo: 'bar'});
    });
  });

  describe('.loadPlugins():', function () {
    it('should load plugins.', function () {
      var plugins = verb.loadPlugins('test/fixtures/plugins/*.js');

      plugins.should.have.property('a');
      plugins.should.have.property('b');
      plugins.should.have.property('c');
    });
  });
});
