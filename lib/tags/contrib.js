/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var contrib = require('verb-contrib-templates');
var _ = require('lodash');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  exports.contrib = function (name, options) {
    var opts = _.extend(verbOpts, {ext: verb.ext}, options || {});
    var files = file.match(name + opts.ext, contrib, {
      matchBase: true
    });

    var output = files.map(function (filepath) {
      var content = file.readFileSync(filepath);

      // Parse front matter in the file
      var page = verb.matter(filepath);

      var context = _.extend(_.cloneDeep(verb.context), page.context);
      return verb.template(page.content, context);
    }).join(opts.sep || '\n');

    return utils.adjust.headings(output);
  };
  return exports;
};