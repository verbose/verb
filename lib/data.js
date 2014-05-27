/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const plasma = require('plasma');
const _ = require('lodash');


/**
 * Extend context with metadata from
 * `options.data`.
 *
 * @param {Object} options
 * @return {Object}
 * @api private
 */

function data(verb) {
  var opts = _.extend({}, verb.options || {});
  opts.data = opts.data || {};
  return _.extend({}, { contributing: true }, plasma(opts.data));
}

module.exports = data;