/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const contrib = require('verb-contrib-templates');
const _ = require('lodash');

module.exports = function (verb) {
  verb.options = verb.options || {};
  var utils = verb.utils;

  exports.contrib = function (name, options) {
    var opts = _.extend({ext: verb.ext}, options || {});
    _.extend(verb.options, opts);

    var files = file.match(name + opts.ext, contrib, {
      matchBase: true
    });

    var output = files.map(function (filepath) {
      var content = utils.delims.escape(file.readFileSync(filepath));

      // Parse front matter in the file
      var page = verb.matter(content);

      var context = _.extend(_.cloneDeep(verb.context), page.data);
      return verb.template(page.content, context);
    }).join(opts.sep || '\n');

    return utils.adjust.headings(output);
  };
  return exports;
};