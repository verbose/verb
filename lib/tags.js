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

module.exports = function (verb) {
  var options = verb.options || {};
  options.tags = options.tags || [];
  var builtIns = path.join(__dirname, 'tags/*.js');

  _.extend(verb.context, plasma.load(builtIns, {
    config: verb
  }).modules.resolved);

  _.extend(verb.context, plasma.load(options.tags, {
    config: verb
  }).modules.resolved);
};