/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);

  /**
   * _.shortname("helper-foo")
   *
   * @param  {[type]} name The name to be modified
   * @return {[type]}      The "safe" short version of the name
   *
   * @example: "grunt-readme" => "readme"
   * @example: "helper-foo" => "foo"
   *
   * @api Public
   */
  var blacklist = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'filter', 'assemble-contrib', 'assemble'];

  exports.shortname = function (name, options) {
    var opts = _.extend({}, phaserOpts, options);
    phaserOpts.shortname = phaserOpts.shortname || {};

    if(opts.blacklist === false) {blacklist = [];}
    var exclusions = _.union(blacklist, phaserOpts.shortname.exclusions, phaser.utils.arrayify(options.omit));
    var re = new RegExp('^(?:' + exclusions.join('|') + ')[-_]?', 'g');
    return name.replace(re, '');
  };

  return exports;
};