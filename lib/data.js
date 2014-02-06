/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

var expandData = require('./utils/expandData');


/**
 * Extend context with metadata from
 * `options.data`.
 *
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function(options) {
  var opts = _.defaults({}, options, {
    contributing: true,
    namespace: false
  });
  return expandData(opts.data, opts);
};