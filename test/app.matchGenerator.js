'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var spawn = require('cross-spawn');
var exists = require('fs-exists-sync');
var Base = require('..');
var base;

describe('.matchGenerator', function() {
  before(function(cb) {
    if (!exists(path.resolve(__dirname, '../node_modules/generate-foo'))) {
      spawn('npm', ['install', '--global', 'generate-foo'], {stdio: 'inherit'})
        .on('error', cb)
        .on('close', function(code, err) {
          cb(err, code);
        });
    } else {
      cb();
    }
  });

  beforeEach(function() {
    base = new Base();

    base.option('toAlias', function(key) {
      return key.replace(/^generate-(.*)/, '$1');
    });
  });

  it('should match a generator by name', function() {
    base.register('generate-foo');

    var gen = base.matchGenerator('generate-foo');
    assert(gen);
    assert.equal(gen.env.name, 'generate-foo');
    assert.equal(gen.env.alias, 'foo');
  });

  it('should match a generator by alias', function() {
    base.register('generate-foo');

    var gen = base.matchGenerator('foo');
    assert(gen);
    assert.equal(gen.env.name, 'generate-foo');
    assert.equal(gen.env.alias, 'foo');
  });

  it('should match a generator by path', function() {
    base.register('generate-foo');
    var gen = base.matchGenerator(require.resolve('generate-foo'));
    assert(gen);
    assert.equal(gen.env.name, 'generate-foo');
    assert.equal(gen.env.alias, 'foo');
  });
});
