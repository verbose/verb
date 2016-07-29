/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Generate = require('generate');
var utils = require('./lib/utils');
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
  Generate.call(this, options);
  this.is('verb');
  this.initVerb(this.options);
}

/**
 * Extend `Verb`
 */

Generate.extend(Verb);

Generate.on('generate.preInit', function(app) {
  Verb.emit('generate.preInit', app);
});

Generate.on('generate.postInit', function(app) {
  Verb.emit('generate.postInit', app);
});

/**
 * Initialize Stores
 */

utils.stores(Verb.prototype);

/**
 * Initialize verb data
 */

Verb.prototype.initVerb = function(opts) {
  Verb.emit('verb.preInit', this, this.base);
  var self = this;

  /**
   * Data
   */

  this.data('before', {});
  this.data('after', {});
  this.data('runner', {
    name: 'verb',
    version: pkg.version,
    homepage: pkg.homepage
  });

  /**
   * Options
   */

  this.option('lookup', Verb.lookup(this));
  this.option('toAlias', Verb.toAlias);
  this.option('help', {
    command: 'verb',
    configname: 'verbfile',
    appname: 'verb'
  });

  /**
   * Listeners
   */

  this.on('option', function(key, val) {
    if (key === 'dest') self.cwd = val;
  });

  this.on('ask', function(answerVal, answerKey, question) {
    if (typeof answerVal === 'undefined') {
      var segs = answerKey.split('author.');
      if (segs.length > 1) {
        self.questions.answers[answerKey] = self.common.get(segs.pop());
      }
    }
  });

  /**
   * Middleware
   */

  this.preWrite(/(^|\/)[$_]/, function(file, next) {
    file.basename = file.basename.replace(/^_/, '.');
    file.basename = file.basename.replace(/^\$/, '');
    next();
  });

  Verb.emit('verb.postInit', this, this.base);
};

/**
 * Expose custom lookup function for resolving generators
 */

Verb.lookup = function(app) {
  return function(key) {
    var patterns = [key];
    if (!/^verb-generate-([^-]+)/.test(key)) {
      patterns.unshift(`verb-generate-${key}`);
    }
    if (app.enabled('generate')) {
      patterns.push(`generate-${key}`);
    }
    return patterns;
  };
};

/**
 * Convert the given `name` to the `alias` to be used in the
 * command line.
 */

Verb.toAlias = function(name) {
  return name.replace(/^(?:verb-generate-([^-]+)$)|(?:generate-)/, '$1');
};

/**
 * Expose `pkg` as a static property
 */

Verb.pkg = pkg;

/**
 * Expose `Verb`
 */

module.exports = Verb;
