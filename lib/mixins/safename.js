/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

// Local libs
var utils = require('../utils');

// Custom mixins
module.exports = function(config, options) {
  options = options || {};

  /**
   * _.safename("helper-foo")
   * @param  {[type]} name The name to be modified
   * @return {[type]}      The "safe" short version of the name
   * @example: "grunt-readme" => "readme"
   * @example: "helper-foo" => "foo"
   */
  var blacklist = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'filter', 'assemble-contrib', 'assemble'];

  exports.safename = function (name, options) {
    var opts = _.extend({}, options);
    if(opts.blacklist === false) {blacklist = [];}
    var exclusions = _.union(blacklist, utils.arrayify(options.omit));
    var re = new RegExp('^(?:' + exclusions.join('|') + ')[-_]?', 'g');
    name = name.replace(re, '');
    return name;
  };

  return exports;
};