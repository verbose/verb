/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var minimatch = require('minimatch');
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('../utils');


module.exports = function(config, options) {
  var phaserOpts = options || {};

  exports.authors =function (filepath) {
    var opts = _.extend({}, phaserOpts, options);
    return utils.authors(filepath || 'AUTHORS');
  };

  return exports;
};