/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path = require('path');

// node_modules
var glob = require('globule');
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('../utils');

// Custom mixins
module.exports = function(config, options) {
  options = options || {};
  var defaults = {cwd: 'docs', ext: '.md'};

  exports.contrib =function (name, options) {
    var opts = _.extend({}, defaults, options);
    var contrib = require('readme-contrib');

    var filepaths = _.filter(contrib, function (filepath) {
      return file.basename(filepath) === name;
    });

    // if no matches, then try minimatch
    if (!filepaths || filepaths.length <= 0) {
      filepaths = contrib.filter(minimatch.filter(name));
    }

    return filepaths.map(function(filepath) {
      var content = file.readFileSync(filepath, opts);
      return utils.adjustHeadings(content);
    });
  };

  return exports;
};