'use strict';

/**
 * Load built-in engines
 */

module.exports = function engines_(verb) {
  verb.engine('md', require('engine-lodash'));
};
