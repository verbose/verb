/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function(verb) {
  var verbOpts = verb.options || {};

  exports.shortname = function (name, options) {
    var opts = _.extend({}, verbOpts, options);
    return verb.utils.safename(name, opts);
  };

  return exports;
};