/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var matter = require('gray-matter');
var _ = require('lodash');

module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var utils = phaser.utils;

  exports.docs = function (patterns, options) {
    var opts = _.defaults({}, options, phaserOpts, {ext: '.md', sep: '\n'});
    var src = '';

    try {
      src = require(patterns);
    } catch(e) {
      var localDocs = path.join(phaser.base, 'docs', patterns);
      src = file.expand(localDocs + '*').map(function(filepath) {
        filepath = path.resolve(filepath);

        var str = file.readFileSync(filepath);
        var page  = matter(str);

        phaser.page.context = _.extend(phaser.context, phaser.page.context, page.context, options);
        return phaser.template(page.content, phaser.page.context);
      }).join(opts.sep);
    }
    return utils.adjust.headings(src);
  };

  return exports;
};