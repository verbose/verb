/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('generator-util');
var define = require('define-property');
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

  this.options = utils.extend({}, this.options, options);
  Generate.call(this, this.options);
  delete this.cache.data.runner;

  this.is('verb');
  Generate.debug(this);

  Verb.emit('preInit', this, this.base);
  this.debug('initializing');
  this.verbDefaults(options);
  this.initVerb(this.options);
  Verb.emit('init', this, this.base);
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

  this.set('appname', 'verb');
  this.data({runner: {name: 'verb', url: 'https://github.com/verbose/verb'}});
  var aliasRegex = /^verb-([^-]+)-generator$/g;

  this.toFullname = function(name) {
    return 'verb-' + this.toAlias(name) + '-generator';
  };

  this.isGeneratorPath = function(fp) {
    return aliasRegex.test(fp) || /^generate-/.test(fp);
  };

  this.toAlias = function(name) {
    return name.replace(aliasRegex, '$1');
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
