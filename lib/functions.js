/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

// node_modules
var chalk = require('chalk');
var file = require('fs-utils');
var glob = require('globule');
var _ = require('lodash');


exports.init = function(options) {
  var opts = _.extend({functions: {}}, options);

  return _.extend({}, opts.functions);
};