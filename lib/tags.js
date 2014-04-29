/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const plasma = require('plasma');
const _ = require('lodash');

/**
 * Adds tags to the context
 *
 * @name tags
 * @param {Object} options
 * @return {Object}
 * @api private
 */
var builtIns = path.join(__dirname, 'tags/*.js');

module.exports = function (verb) {
  var opts = _.extend({tags: []}, verb.options);

  _.extend(verb.context, plasma.fn(builtIns, { config: verb }));
  _.extend(verb.context, plasma.fn(opts.tags, { config: verb }));
};