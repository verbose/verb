/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Flatten an array and convert it
 * to a comma-separated list.
 *
 * @title listify
 * @param {Array} arr [description]
 * @api Public
 */

module.exports = function (verb) {
  exports.listify = function(arr, sep) {
    return verb.utils.listify(arr, sep);
  };
  return exports;
};

