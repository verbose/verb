/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');
var _ = require('lodash');



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
