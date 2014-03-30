/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const url = require('url');
const _ = require('lodash');



/**
 * Extract a username/org from a
 * GitHub URL.
 *
 * @param  {String}
 * @return {String}
 * @api public
 */

module.exports = function(str) {
  var pathname = url.parse(str).pathname;
  var name = _.compact(pathname.split('/'))[0];
  return name;
};
