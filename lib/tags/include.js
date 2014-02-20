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
  var defaults = require('readme-templates');
  var utils = phaser.utils;

  exports.include = function (patterns, options) {
    var opts = _.extend({
      includes: '',
      ext: '.md',
      sep: '\n',
      glob: {
        filter: 'isFile',
        matchBase: true
      }
    }, options, phaserOpts);

    var local = utils.lookup(opts.includes, patterns);
    var npm = utils.lookup(defaults, patterns);
    var includes = _.union([], npm, local);

    if(opts.knownIncludes) {
      includes = local;
    }

    var src = includes.map(function(filepath) {

      // Parse front matter in the include
      var include = matter.read(filepath);

      var context = _.extend(_.cloneDeep(phaser.context, opts), include.context);
      return phaser.template(include.content, context);
    }).join('\n');

    return utils.adjust.headings(src);
  };

  return exports;
};

