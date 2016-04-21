/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Generate = require('generate');

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
  Generate.call(this, options);
  this.is('verb');
  this.initVerb(this.options);
}

/**
 * Extend `Verb`
 */

Generate.extend(Verb);

/**
 * Initialize verb data
 */

Verb.prototype.initVerb = function(opts) {
  this.debug('initializing', __filename);

  delete this.cache.data.runner;
  if (this.options.namespace === true) {
    delete this.options.namespace;
  }

  Verb.emit('preInit', this, this.base);
  this.data({runner: require('./package')});
  Verb.emit('init', this, this.base);
};

/**
 * Expose static `is*` methods from Templates
 */

Generate._.plugin.is(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
