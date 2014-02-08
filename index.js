/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var chalk      = require('chalk');
var file       = require('fs-utils');
var extend     = require('extend');
var _          = require('lodash');

var success    = chalk.green;
var error      = chalk.red;

// Internal libs
var utils      = require('./lib/utils');
var lib        = require('./lib');
var template   = lib.template;
var plugins    = lib.plugins;
var filters    = lib.filters;
var partials   = lib.partials;
var exclusions = lib.exclusions;
var functions  = lib.functions;
var matter     = lib.matter;

/**
 * Phaser
 */

var phaser = module.exports = function phaser(src, options) {
  var opts = _.extend({verbose: false}, options);

  // Template settings
  var settings = _.defaults({}, opts.settings);

  // Initialize modules
  var config   = lib.config.init(opts.config);
  var data     = lib.data.init(opts);

  // Extract and parse front matter
  var page     = matter.init(src, opts);
  var content  = page.content;
  var metadata = page.context;

  // Build up the context
  var context  = _.extend({}, metadata, config, opts, data);
  delete context.config;

  if(!page && !context) {
    throw new Error(error('Phaser: no source files defined.'));
  }

  // Add Table of Contents to templates with: {%= toc %}
  context.toc = utils.toc(content);

  // Exclude options from context
  context = exclusions.init(context, opts);

  // Initialize plugins
  var p = plugins.init(config, opts, {
    context: data
  });

  // Initialize functions
  var fn = functions.init(config, opts, {
    context: context,
    page: page
  });

  // Extend context with custom functions and filters,
  var fnContext = _.defaults({}, metadata, p, fn, context);

  // Initialize Lo-Dash filters (mixins)
  filters.init(config, opts, {
    context: fnContext,
    page: page
  });

  // Initialize partials
  partials.init(config, opts, {
    context: fnContext,
    page: page
  });

  // Process templates and render content
  var block = utils.block(config, opts, page);
  content = block.block(content);

  var rendered = template(content, fnContext, settings);
  var result = utils.postProcess(rendered, opts);
  // console.log("context:", context);
  return {
    context: context,
    content: result,
    original: src
  };
};

// Expose utils;
phaser.utils = utils;


// Alias for phaser(src).content;
phaser.process = function(src, options) {
  return phaser(src, _.extend({}, options)).content;
};


// Read a file, then process with Phaser
phaser.read = function(src, options) {
  var content = file.readFileSync(src);
  return phaser.process(content, _.extend({}, options));
};


// Read a file, process it with Phaser, then write it.
phaser.copy = function(src, dest, options) {
  var opts = _.extend({}, options);
  file.writeFileSync(dest, phaser.read(src, opts));
  console.log(success('>> Saved to:'), dest);
};


phaser.expand = function(src, dest, options) {
  var opts = _.extend({}, options);

  utils.expand.mapping(src, dest, opts.glob || {}).map(function(fp) {
    file.writeFileSync(fp.dest, phaser.read(fp.src, opts));
    console.log(success('>> Saved to:'), fp.dest);
  });
  console.log(success('\n>> Completed successfully.'));
};
