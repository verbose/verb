/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

/**
 * Adds plugins to the context
 *
 * @name plugins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (verb) {
  var opts = verb.options || {};
  opts.plugins = opts.plugins || [];

  var run = verb.utils.extendContext;
  var builtIns = path.join(__dirname, 'plugins/*.js');

  /**
   * Run built-in plugins
   */

  run(verb, builtIns);

  /**
   * Run user-defined
   */

  run(verb, opts.plugins);
};