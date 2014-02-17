/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var file     = require('fs-utils');
var toc      = require('marked-toc');
var template = require('template');
var relative = require('relative');
var _        = require('lodash');

// Custom TOC template for marked-toc
var tmpl = '<%= depth %><%= bullet %>[<%= heading %>](<%= url %>)\n';


module.exports = function(phaser) {
  var phaserOpts = _.extend({sep: '\n'}, phaser.options);

  var stack = [];

  exports.toc = function(src, options) {

    // Extend TOC options with phaser options
    var opts = _.extend(phaserOpts, {toc: {firsth1: true}}, options);
    var tocOpts = _.defaults({template: tmpl}, opts.toc);
    var renderedTOC = '';

    if(src) {
      renderedTOC = file.expand(src, opts.glob).map(function(filepath) {
        var dest = phaser.cwd(opts.dest || opts.destBase || '');

        // Build a relative link to each file
        var link = relative(dest || phaser.cwd(), filepath);
        var name = file.name(filepath);

        // Remove "docs-" and other junk from headings
        var safe = _.safename(name, {omit: 'docs', blacklist: false});

        // Read in the file.
        var content = file.readFileSync(filepath);

        // Generate the TOC
        var md = toc.raw(content, tocOpts);

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
      //return toc(phaser.page.content);
      renderedTOC = toc(phaser.page.content);

    }

    stack.push(renderedTOC);
    return renderedTOC;
  };

  exports.toc.async = function (callback) {
    callback(null, stack.pop());
  };

  return exports;
};