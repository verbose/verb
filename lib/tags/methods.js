/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var path = require('path');
var methods = require('list-methods');
var _ = require('lodash');


module.exports = function(verb) {
  var verbOpts = verb.options;
  var tmpl = verb.scaffolds['methods'];

  exports.methods = function(src, options) {
    var opts = _.extend({}, verbOpts, options);
    var filepath = path.resolve(src);
    var data = methods(filepath);

    return _.template(tmpl, _.extend({data: data}, opts));
  };

  return exports;
};