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

console.log(utils);

var phaser = function(src, options) {
  var opts = _.extend({verbose: false}, options);

  var config = require('./config').init(opts.config);    // package.json or alt config object
  var optsData = utils.expandData(opts.data || {});
  var metadata = require('./metadata').init(optsData, opts); // metadata from mixins

  // Extract and parse front matter
  var content = matter(src).content;
  var context = matter(src).context;

  // Build up the context with metadata from front matter
  var meta = _.extend({}, config, metadata, optsData, context);

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

phaser.process = function(src, options) {
  return phaser(src, _.extend({}, options)).content;
};

phaser.processFileSync = function(src, options) {
  var content = file.readFileSync(src);
  return phaser.process(content, _.extend({}, options));
};


module.exports = phaser;