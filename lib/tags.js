/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');

/**
 * Adds tags to the context
 *
 * @name tags
 * @param {Object} options
 * @return {Object}
 * @api private
 */

/**
 * Initialize tags
 * @param   {Object}  verb
 * @return  {Object}
 */

exports.init = function (verb) {
  var options = verb.options || {};
  options.tags = options.tags || [];

  var extendContext = verb.utils.extendContext;
  verb.extensionType = 'tag';

  var tags = {};
  var builtIns = [__dirname, 'tags/*.js'].join('/');

  // Built-in tags
  _.extend(tags, extendContext(verb, builtIns));

  // User-defined
  _.extend(tags, extendContext(verb, options.tags));

  verb.context = _.extend({}, verb.context, tags);
  return verb.context;
};