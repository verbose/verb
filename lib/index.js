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


var phaser = function(src, options) {
  var opts = _.extend({verbose: false},  options);
  var optsData = utils.expandData(opts.data || {}, opts);

  var config = require('./config').init(opts.config);  // package.json or alt config object
  var meta = require('./meta').init(optsData, opts);   // metadata from mixins

  // Extract and parse front matter
  var content = matter(src).content;
  var metadata = matter(src).context;

  // Build up the context
  var context = _.extend({}, config, meta, optsData, metadata);

  // Add Table of Contents to templates with: {%= toc %}
  context.toc = utils.toc(src);

  // Process templates and render content
  var rendered = template(content, context, opts.settings);
  var result = utils.postProcess(rendered, opts);
  return {
    original: src,
    config: context,
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