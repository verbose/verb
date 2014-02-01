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

exports.init = function (config, options) {
  var opts = _.extend({}, options);
  var mixins = {};

  // Built-in mixins
  var builtIns = require('./mixins/index');

  builtIns.copyright(config, opts);
  builtIns.license(config, opts);

  opts.functions.license   = builtIns.license(config, opts);
  opts.functions.copyright = builtIns.copyright(config, opts);
  opts.functions.safename  = builtIns.safename(config, opts);
  opts.functions.shortname = builtIns.safename(config, opts);

  builtIns.badge = function() {}

  if(opts.mixins) {
    opts.mixins = utils.arrayify(opts.mixins);
    try {
      glob.find(opts.mixins).map(function(filepath) {
        var mixin = path.join(process.cwd(), filepath);
        mixins = _.extend(builtIns, require(mixin)(opts) || {});
      });
    } catch (e) {
      e.origin = __filename;
      throw new Error('No mixins found: (error code "' + e.code + '").', e.stack);
    }
  } else if (opts.mixins && _.isObject(opts.mixins)) {
    mixins = _.extend(builtIns, opts.mixins);
  } else {
    mixins = builtIns;
  }
  _.mixin(mixins);
  return mixins;
};