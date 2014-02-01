/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Generate a Table of Contents. Use {%= toc %} in templates
var toc = module.exports = function(src) {
  return require('marked-toc')(src);
};