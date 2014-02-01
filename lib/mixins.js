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
var _ = require('lodash');

// Local libs
var utils = require('./utils');

var expand = function (src, options) {
  options = _.extend({sep: '\n', prefixBase: true}, options);
  options.cwd = options.cwd || process.cwd();
  return glob.find(src, options);
};

exports.init = function (config, options) {
  var opts = _.extend({}, options);
  var mixins = [];

  // Built-in mixins
  var builtIns = require('./mixins/index');
  mixins.push(builtIns);

  if(opts.mixins) {
    opts.mixins = utils.arrayify(opts.mixins);
    try {
      expand(opts.mixins).map(function(filepath) {
        mixins.push(require(filepath)(config, options));
      });
    } catch (e) {
      e.origin = __filename;
      console.warn('No mixins found: (error code "' + e.code + '").', e.stack);
    }
  } else if (opts.mixins && _.isObject(opts.mixins)) {
    mixins.push(opts.mixins);
  }

  mixins.map(function(ea) {
    _.mixin(ea);
  });

  return mixins;
};