'use strict';

var path = require('path');
var utils = require('../utils');

/**
 * File cache, to prevent subsequent calls for the
 * same package.json.
 */

var cache = {};

/**
 * Load package.json data onto `verb.cache.data`. A
 * read-only copy of this data is stored on `verb._env`.
 */

module.exports = function pkg(verb) {
  verb.data(verb.option('pkg'), function(fp) {
    return cache[fp] || (cache[fp] = utils.tryRequire(fp));
  });
};