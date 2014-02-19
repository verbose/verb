/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var file = require('fs-utils');
var _ = require('lodash');
var boilerplates = require('readme-boilerplates');

module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);

  /**
   * Boilerplates are used to kickstart new projects.
   * Using the API, you can pre-define a boilerplate
   * to use when a new project is initialized.
   *
   * @name boilerplate
   *
   * @param {Object} config
   * @param {Object} options
   * @return {Object}
   *
   * @api private
   */
  exports.boilerplate =function (patterns, options) {
    var opts = _.extend({ext: '.md'}, phaserOpts, options);
    opts.cwd = phaser.cwd(opts.cwd || 'docs');

    return boilerplates(patterns).map(function(filepath) {
      var content = file.readFileSync(filepath, opts);
      return phaser.utils.adjust.headings(content);
    });
  };

  return exports;
};