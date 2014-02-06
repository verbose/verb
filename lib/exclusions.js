/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');


/**
 * Default exclusions
 */

var exclusions = [
  'namespace',
  'contributing',
  'verbose',
  'matter',
  'lang',
  'mixins',
  'functions'
];


/**
 * Omit properties from the context
 *
 * @return {Object}
 * @api private
 */

exports.init = function(context, options) {
  var opts = _.extend({omit: []}, options);
  var omit = _.defaults(opts.omit, exclusions);
  return _.omit(context, omit);
};