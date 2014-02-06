/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matter = require('gray-matter');
var _ = require('lodash');


/**
 * Omit properties from the context
 *
 * @return {Object}
 * @api public
 */

exports.init = function(src, options) {
  var defaults = {autodetect: true};
  var opts = _.defaults({}, options.matter, defaults);
  return matter(src, opts);
};