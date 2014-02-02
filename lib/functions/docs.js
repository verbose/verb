/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('../utils');

// Custom mixins
module.exports = function(config, options, params) {
  var phaserOpts = options || {};

  // Defaults can be overwritten in the options.
  var defaults = {cwd: 'docs', ext: '.md', sep: '\n'};

  exports.docs = function (name, options) {
    var opts = _.defaults({}, options, defaults, phaserOpts);
    var src = '';
    try {
      src = require(name);
    } catch(e) {
      src = utils.expand(name + opts.ext, opts).map(function(filepath) {
        return file.readFileSync(filepath);
      }).join(opts.sep);
    }
    return src;
  };

  return exports;
};