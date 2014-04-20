/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');
const plasma = require('plasma');


/**
 * Extend context with metadata from
 * `options.data`.
 *
 * @param {Object} options
 * @return {Object}
 * @api private
 */

module.exports = function (verb) {
  verb.options = verb.options || {};
  verb.options.data = verb.options.data || {};
  var opts = _.extend({}, verb.options);

  var data = plasma.load(opts.data).data;
  return _.extend(opts, { contributing: true, data: data });
};