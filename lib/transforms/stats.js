'use strict';

/**
 * Prime the `stats` object.
 */

module.exports = function stats(verb) {
  verb.cache.stats = verb.cache.stats || {};
};