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
var file = require('fs-utils');
var _ = require('lodash');

var base = require('cwd')();
var relative = require('relative');
var cwd = file.normalizeSlash(relative(base, __dirname));

/**
 * Adds mixins to the context
 *
 * @name mixins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var globOpts = {cwd: cwd, prefixBase: false, nonull: true};

  // Mix in mixins
  file.expand(['./mixins/*.js'], globOpts).map(function(filepath) {
    var name = path.resolve(cwd, filepath);
    phaser.verbose.warn("Mixins:", name);
    _.mixin(require(name)(phaser));
  });

  // Mix in utils
  file.expand(['./utils/*.js'], globOpts).map(function(filepath) {
    var name = path.resolve(cwd, filepath);
    phaser.verbose.warn("Mixins (utils):", name);
    _.mixin(require(name));
  });

  if(opts.mixins) {
    if (_.isObject(opts.mixins)) {
      _.mixin(opts.mixins);
    } else {
      opts.mixins = phaser.utils.arrayify(opts.mixins);
      try {
        file.expand(opts.mixins, {cwd: base}).map(function(filepath) {
          _.mixin(require(filepath)(phaser));
        });
      } catch (e) {
        e.origin = __filename;
        phaser.verbose.warn('No mixins found: (error code "' + e.code + '").', e.stack);
      }
    }
  }
  return;
};
