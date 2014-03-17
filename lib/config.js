/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var _ = require('lodash');


/**
 * Initialize user-config object. Unless overridden by passing
 * an object to `options.config`, this defaults to the
 * package.json of the user's current, local project,
 *
 * @param {Object} config
 * @return {Object}
 * @api private
 */

exports.init = function(data) {
  var config = {};
  try {
    config = require('config-file').load();

    // Load package.json unless an explicit data object is passed in,
    // or if options.data is defined as "false"
    if((data && !_.isEmpty(data))) {
      config = data;
    }
  } catch (e) {
    e.origin = __filename;
    throw new Error(e.stack, 'No config object or "package.json" was found');
  }
  return config;
};