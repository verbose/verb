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

module.exports = function (verb) {
  var opts = _.extend({}, verb.options || {});
  opts.data = opts.data || {};
  var data = plasma.load(opts.data).data;

  return _.extend({}, { contributing: true }, data);
};