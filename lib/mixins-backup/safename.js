/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var _ = require('lodash');


module.exports = function(config, options) {
  /**
   * _.safename("helper-foo")
   * @param  {[type]} name The name to be modified
   * @return {[type]}      The "safe" short version of the name
   * @example: "grunt-readme" => "readme"
   * @example: "helper-foo" => "foo"
   */
  var sanitize = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'filter', 'assemble-contrib', 'assemble'];

  var safename = function (name, userDefined) {
    var remove = _.unique(_.flatten(_.union(sanitize, userDefined || [])));
    var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
    return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
  };


  _.mixin(safename);
  return safename;
};
