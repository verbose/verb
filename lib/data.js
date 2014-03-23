/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

var expandData = require('./utils/expandData');


/**
 * Extend context with metadata from
 * `options.data`.
 *
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function(options) {
  var opts = _.extend({
    contributing: true,
    namespace: false
  }, options);
  return expandData(opts.data, opts);
};