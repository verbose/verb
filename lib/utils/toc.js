/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var generate = require('marked-toc');

// Generate a Table of Contents. Use {%= toc %} in templates
var toc = module.exports = function(src, options) {
  var opts = _.extend({}, options);
  return generate(src, opts).toc;
};