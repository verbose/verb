/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');

module.exports = function(verb) {
  verb.options = verb.options || {};

  exports.safename = function (name, options) {
    var opts = _.extend({}, verb.options, options);
    return verb.utils.safename(name, opts);
  };

  // Alias as `shortname()`
  exports.shortname = exports.safename;
  return exports;
};