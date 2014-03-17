/**
 * Verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(config, options) {
  options = options || {};

  exports.join = function(a, b) {
    return a + b;
  };

  return exports;
};