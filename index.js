/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Generate = require('generate');
var utils = require('./lib/utils');

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
Generate.on('generate.init', function(app) {
  Verb.emit('generate.init', app);
});

/**
 * Expose custom lookup function for resolving generators
 */

Verb.lookup = function(app) {
  return function(key) {
    var patterns = [key];
    if (!/^verb-([^-]+)-generator/.test(key)) {
      patterns.unshift(`verb-${key}-generator`);
    }

    if (app.enabled('generators')) {
      patterns.push(`generate-${key}`);
    }
    return patterns;
  };
};

/**
 * Initialize verb data
 */

Verb.prototype.initVerb = function(opts) {
  this.debug('initializing', __filename);

  Verb.emit('verb.preInit', this, this.base);
  this.data({before: {}, after: {}});

  this.option('toAlias', function(name) {
    return name.replace(/^(?:verb-([^-]+)-generator$)|(?:generate-)/, '$1');
  });

  this.option('lookup', Verb.lookup(this));
  this.data({runner: require('./package')});
  Verb.emit('verb.postInit', this, this.base);
};

/**
 * Expose static `is*` methods from Templates
 */

Generate._.plugin.is(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
