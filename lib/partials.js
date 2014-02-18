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
var _ = require('lodash');


exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var cache = {};

  /**
   * Define individual partials.
   *
   * @name partials
   * @return {Object}
   * @api public
   *
   * @example:
   *   _.definePartial('tooltip', '<div class="tooltip">${ content }</div>');
   */

  exports.definePartial = function (name, template) {

    // Return if already compiled
    if (typeof cache[name] === 'function') {
      return cache[name];
    }

    return cache[name] = _.template(template);
  };

  exports.cache = function(patterns) {
    file.expand(patterns).forEach(function (filepath) {
      filepath = path.resolve(filepath);
      var name = file.base(filepath);
      _.definePartial(name, require(filepath));
    });
  };


  /**
   * Register partials as strings. Use `options.partials`
   * to add partials. Globbing patterns may be used.
   *
   * @name partials
   * @return {Object}
   * @api public
   */

  exports.registerPartials = function(patterns) {
    file.expand(patterns).forEach(function (filepath) {
      var name = file.base(filepath);
      var template = file.readFileSync(filepath);
      cache[name] = _.template(template);
    });
  };

  exports.partial = function (name, data) {
    data = _.defaults({}, data, opts);
    return cache[name](data);
  };

  _.mixin(exports);
  _.registerPartials(opts.partials || []);
  _.cache(opts.cache || []);
  return exports;
};