/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');

module.exports = function(str) {
  var obj = url.parse(str);
  var ending = obj.path.replace(/\.git$/, '/');
  return 'https://' + obj.host + ending;
};