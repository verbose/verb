/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var _ = require('lodash');

var sanitize = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'filter', 'assemble-contrib', 'assemble'];

/**
 * _.safename("helper-foo")
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 * @example: "grunt-readme" => "readme"
 * @example: "helper-foo" => "foo"
 */
module.exports = function(config, options) {

  return function (name, userDefined) {
    var remove = _.unique(_.flatten(_.union(sanitize, userDefined || [])));
    var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
    return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
  };
};
