/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('base:verb');
var Generate = require('generate');
var utils = require('./lib/utils');
var pkg = require('./package');

/**
 * Create an instance of `Verb` with the given `options`
 *
 * ```js
 * var Verb = require('verb');
 * var verb = new Verb();
 * ```
 * @param {Object} `options` Settings to initialize with.
 * @api public
 */

function Verb(options) {
  if (!(this instanceof Verb)) {
    return new Verb(options);
  }
  this.options = this.verbDefaults(options);
  Generate.call(this, this.options);
  this.initVerb(this.options);
}

/**
 * Extend `Generate`
 */

Generate.extend(Verb);

/**
 * Initialize verb defaults
 */

Verb.prototype.verbDefaults = function(options) {
  debug('initializing verb defaults');
  var defaults = {prefix: 'verb-generate', configfile: 'verbfile.js'};
  return utils.extend({}, defaults, this.options, options);
};

/**
 * Initialize verb data
 */

Verb.prototype.initVerb = function(opts) {
  debug('initializing verb data');
  this.is('verb');
  this.name = 'verb';
  this.data({runner: pkg});
  this.data({verb: {related: {}, reflinks: []}});
  // this.create('files');
  // this.create('docs');
};

/**
 * Expose static `is*` methods from Templates
 */

Generate._.plugin.is(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
