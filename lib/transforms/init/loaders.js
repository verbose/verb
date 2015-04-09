'use strict';

var loaders = require('../../loaders');

/**
 * Load built-in loaders
 */

module.exports = function base_(verb) {
  verb.loader('base', [loaders.base]);
  verb.loader('task', [loaders.task]);
};
