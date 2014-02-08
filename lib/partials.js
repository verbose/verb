/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('./utils');


exports.init = function (config, options) {
  var opts = _.extend({}, options);
  var cache = config.cache = {};


  /**
   * Define individual partials.
   *
   * @name partials
   * @return {Object}
   * @api public
   */

  exports.definePartial = function (name, template) {
    return cache[name] = _.template(template);
  };


  /**
   * Cache partials with globbing patterns.
   * Use `options.partials`
   *
   * @name partials
   * @return {Object}
   * @api public
   */

  exports.registerPartials = function(patterns) {
    var filesArray = utils.expand(patterns);

    filesArray.forEach(function (filepath) {
      var name = file.base(filepath);
      var template = file.readFileSync(filepath);
      cache[name] = _.template(template);
    });
  };
  exports.registerPartials(opts.partials || []);

  _.mixin(exports);
  _.definePartial('tooltip', '<div class="tooltip">${ content }</div>');

  return exports;
};