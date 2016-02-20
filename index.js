/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('base:verb');
var utils = require('generator-util');
var Generate = require('generate');
var pkg = require('./package');

/**
 * Create a verb application with `options`.
 *
 * ```js
 * var verb = require('verb');
 * var app = verb();
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
 * Initialize verb data
 */

Verb.prototype.initVerb = function(opts) {
  debug('initializing verb data');

  this.is('verb');
  this.name = 'verb';
  this.isApp = true;

  this.data({runner: pkg});
  this.data({verb: {related: {}, reflinks: []}});
  var aliasRegex = /(^verb-?|-?generat(e|or)-?)/g;

  // temporary, there is an easier way to do this
  this.toFullname = function(str) {
    return 'verb-' + this.toAlias(str) + '-generator';
  };

  // temporary, there is an easier way to do this
  this.toAlias = function(str) {
    return str.replace(aliasRegex, '');
  };

  if (process.env.GENERATE_CLI) {
    this.use(utils.create(this.options));
    this.create('files');
    this.create('docs');
  }
};

/**
 * Initialize verb defaults
 */

Verb.prototype.verbDefaults = function(options) {
  debug('initializing verb defaults');
  var defaults = { prefix: 'verb', configfile: 'verbfile.js' };
  return utils.extend({}, defaults, this.options, options);
};

/**
 * Expose static `is*` methods from Templates
 */

Generate._.plugin.is(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
