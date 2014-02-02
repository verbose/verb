/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

// node_modules
var file     = require('fs-utils');
var mdtoc    = require('marked-toc');
var template = require('template');
var relative = require('relative');
var _        = require('lodash');

// Local libs
var utils    = require('../utils');

// Custom TOC template for marked-toc
var tmpl = '<%= depth %><%= bullet %>[<%= heading %>](<%= url %>)\n';

module.exports = function(config, options, params) {
  var phaserOpts = _.extend({sep: '\n'}, options);

  exports.toc = function(src, options) {
    // Extend phaser options with TOC options
    var opts = _.extend(phaserOpts, {toc: {firsth1: true}});
    opts.toc = _.defaults({template: tmpl}, options, opts.toc);

    if(src) {
      return utils.expand(src).map(function(filepath) {
        // Build a relative link to each file
        var link = relative(opts.dest, filepath);
        var name = file.base(filepath);

        // Remove "docs-" and other junk from headings
        var safe = _.safename(name, {omit: 'docs', blacklist: false});

        // Read in the file.
        var content = file.readFileSync(filepath);

        // Generate the TOC
        var md = mdtoc(content, opts.toc);

        // Now directly augment the raw data from marked-toc,
        // so we can generate our TOC from a custom template.
        var output = md.data.map(function(obj) {
          obj = _.extend(obj, {url: link + '/#' + obj.url});
          return template(tmpl, obj);
        }).join('');

        // Reconstruct the "section" headings using a
        // sanitized version of the filenames.
        var heading = _.str.titleize(safe);
        var section = '# [' + heading + '](' + link + ')\n\n';

        // Render our new TOC (add it to the context)
        return section + output;
      }).join(opts.sep);
    } else {
      // If no src patterns are passed in, just
      // render the TOC from the content of the current page.
      return utils.toc(params.page.content);
    }
  };
  return exports;
};