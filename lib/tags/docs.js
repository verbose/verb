/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var matter = require('gray-matter');
var _ = require('lodash');

module.exports = function (phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var utils = phaser.utils;

  exports.docs = function (patterns, options) {
    var opts = _.defaults({}, options, phaserOpts, {
      ext: '.md',
      sep: '\n'
    });

    var src = '';
    var localDocs = phaser.cwd(opts.cwd || 'docs', patterns + '*');

    try {
      src = require(patterns);
    } catch (e) {
      src = file.expand(localDocs).map(function (filepath) {
        filepath = path.resolve(filepath);

        // Parse front-matter
        var page = matter.read(filepath);

        // Extend the context
        var context = _.extend(_.cloneDeep(phaser.context, opts), page.context);
        return phaser.template(page.content, context);
      }).join(opts.sep);
    }
    return utils.adjust.headings(src);
  };

  return exports;
};