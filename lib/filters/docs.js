/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var matter = require('gray-matter');
var template = require('template');
var _ = require('lodash');

module.exports = function(config, options, params) {
  var phaserOpts = options || {};
  var phaser = params.phaser;
  var utils = phaser.utils;


  exports.docs = function (name, options) {
    var defaults = {cwd: 'docs', ext: '.md', sep: '\n'};
    var opts = _.defaults({}, defaults, options);
    var src = '';

    try {
      src = require(name);
    } catch(e) {
      src = phaser.expand(name + opts.ext, opts).map(function(filepath) {
        var content = file.readFileSync(filepath);
        var page  = matter(content);

        params.page.context = _.extend(params.context, params.page.context, page.context, options);
        return phaser.template(page.content, params.page.context);
      }).join(opts.sep);
    }
    return utils.adjust.headings(src);
  };

  return exports;
};