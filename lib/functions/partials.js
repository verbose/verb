/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function(config, options, phaser) {
  var opts = _.extend({}, config, options, options.data);
  var cache = config.cache || {};
  // console.log(phaser);

  exports.partial = function (name, data) {
    data = _.defaults({}, data, opts);
    return cache[name](data);
  };

  exports.definePartial = function (name) {
    return cache[name] = _.template(name);
  };

  return exports;
};