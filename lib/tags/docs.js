/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matter = require('gray-matter');
var _ = require('lodash');


module.exports = function (phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var utils = phaser.utils;

  exports.docs = function (patterns, options) {
    var opts = _.extend({
      docs: '',
      ext: '.md',
      sep: '\n',
      glob: {
        filter: 'isFile',
        matchBase: true
      }
    }, options, phaserOpts);

    var local = '';
    if(opts.docs) {
      local = utils.lookup(opts.docs, patterns)
    };

    var auto = utils.lookup('docs/*', patterns);
    var docs = _.union([], auto, local);

    // If `knownDocs` is defined, then the `./docs`
    // directory will not be loaded by default and
    // only the patterns specified in the options
    // will be used
    if(opts.knownDocs) {
      docs = local;
    }

    var src = docs.map(function(filepath) {

      // Parse front matter in the doc
      var doc = matter.read(filepath);

      var context = _.extend(_.cloneDeep(phaser.context, opts), doc.context);
      return phaser.template(doc.content, context);
    }).join('\n');

    return utils.adjust.headings(src);
  };

  return exports;
};

