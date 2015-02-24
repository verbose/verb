'use strict';

var utils = require('../shared/utils');
var cache = require('../cache');

/**
 * Load package.json data onto `verb.cache.data`. A
 * read-only copy of this data is stored on `verb._env`.
 */

module.exports = function(verb) {
  verb.data(verb.option('config'), function(fp) {
    return cache[fp] || (cache[fp] = utils.tryRequire(fp));
  });
};