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

    var lookup = function(location, patterns) {
      location = path.relative(process.cwd(), location);
      var files = file.expand('*'+patterns+'*', {cwd: location});

      return files.map(function(filepath) {
        return file.normalizeSlash(path.resolve(location, filepath));
      });
    };

    var local = lookup(opts.includes, patterns);
    var npm = lookup(defaults, patterns);

    return _.union([], npm, local).map(function(filepath) {

      // Parse front matter in the include
      var include = matter.read(filepath);

      var context = _.extend(_.cloneDeep(phaser.context, opts), include.context);
      return phaser.template(include.content, context);
    }).join('\n');
  };

  return exports;
};

