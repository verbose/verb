/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Local libs
var utils = require('../utils');


module.exports = function (config, options, params) {
  options = options || {};
  params.context.authors = options.authors || utils.authors();
};

// module.exports = function(config, options) {
//   var phaserOpts = options || {};

//   config.authors = utils.authors();
//     exports.authors = function (filepath) {
//   };

//   return exports;
// };