/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var utils = require('../utils');
var file = require('fs-utils');

// Custom mixins
module.exports = function(config, options, params) {
  options = _.extend({sep: '\n'}, options);
  var page = params.page;

  exports.toc = function(src, tocOpts) {
    var opts = _.extend(options, {toc: {removeh1: true}});
    opts.toc = _.extend(opts.toc, tocOpts || {});
    if(src) {
      return utils.expand(src).map(function(filepath) {
        var content = file.readFileSync(filepath);
        return utils.toc(content, opts.toc);
      }).join(opts.sep);
    } else {
      return utils.toc(page.content);
    }
  };

  return exports;
};