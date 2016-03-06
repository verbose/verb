/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('generator-util');
var Generate = require('generate');
var debug = Generate.debug;
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

  this.options = utils.extend({}, this.options, options);
  Generate.call(this, this.options);

  this.is('verb');
  this.define('isApp', true);
  debug(this);

  this.debug('initializing');
  this.verbDefaults(options);
  this.initVerb(this.options);
}

/**
 * Extend `Verb`
 */

Generate.extend(Verb);

/**
 * Initialize verb defaults
 */

Verb.prototype.verbDefaults = function(options) {
  this.debug('initializing verb defaults');
  var defaults = { prefix: 'verb', configfile: 'verbfile.js' };
  this.options = utils.extend(defaults, this.options, options);
};

/**
 * Initialize verb data
 */

Verb.prototype.initVerb = function(opts) {
  this.debug('initializing verb data');

  this.data({runner: pkg});
  this.data({verb: {related: {}, reflinks: []}});
  var aliasRegex = /(^verb-?|-?generat(e|or)-?)/g;

  this.toFullname = function(name) {
    return 'verb-' + this.toAlias(name) + '-generator';
  };

  this.isGeneratorPath = function(fp) {
    return aliasRegex.test(fp) || /^generate-/.test(fp);
  };

  this.toAlias = function(name) {
    return name.replace(aliasRegex, '');
  };

  // if run via CLI, add defaults
  if (process.env.GENERATE_CLI) {
    this.use(utils.create(this.options));
    this.create('files');
  }
};

/**
 * Expose static `is*` methods from Templates
 */

Generate._.plugin.is(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
