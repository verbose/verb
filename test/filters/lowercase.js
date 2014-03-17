/**
 * Verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(config, options) {
  options = options || {};

  exports.lowercase = function(src) {
    return src.toLowerCase();
  };

  return exports;
};