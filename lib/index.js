/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var matter = require('gray-matter');
var file = require('fs-utils');
var _ = require('lodash');

// Internal libs
var template = require('./template');
var utils = require('./utils');

var phaser = function(src, data, options) {
  var opts = _.extend({verbose: false}, options);

  var config = require('./config').init(opts.config);    // package.json or alt config object
  var metadata = require('./metadata').init(data, opts); // metadata from mixins
  // file.writeDataSync('test/actual/opts.json', opts);

  // Extract and parse front matter
  var page = matter(src);
  var content = page.content;
  var context = page.context;

  // Build up the context with metadata from front matter
  var meta = _.extend(config, metadata, context);

  // Add Table of Contents to templates with: {%= toc %}
  meta.toc = utils.toc(src);

  // Process templates and render content
  var content = template(src, meta, opts.settings);
  var result = utils.postProcess(content, opts);

  return {
    original: src,
    config: meta,
    content: result
  };
};

phaser.process = function(src, data, options) {
  return phaser(src, data, options).content;
};

phaser.processFileSync = function(src, data, options) {
  var content = file.readFileSync(src);
  return phaser.process(content, data, options);
};


module.exports = phaser;