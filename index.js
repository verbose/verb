/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var file  = require('fs-utils');
var cwd   = require('cwd');
var _     = require('lodash');

// Internal libs
var utils = require('./lib/utils');
var lib   = require('./lib');


/**
 * Phaser
 */

var phaser = module.exports = {};

phaser.process = function(src, options) {
  var opts = _.extend({verbose: false}, options);
  src = src || '';

  // Template settings
  var settings = _.defaults({}, opts.settings);

  // Extend `phaser`
  phaser.cwd        = cwd();
  phaser.base       = cwd();
  phaser.utils      = utils;
  phaser.template   = lib.template;
  // phaser.file       = lib.file;
  phaser.expand     = lib.expand;
  phaser.plugins    = lib.plugins;
  phaser.filters    = lib.filters;
  phaser.mixins     = lib.mixins;
  phaser.partials   = lib.partials;
  phaser.exclusions = lib.exclusions;
  phaser.matter     = lib.matter;

  // Initialize modules
  var config   = lib.config.init(opts.config);
  var data     = lib.data.init(opts);

  // phaser.file    = phaser.file(context, opts, {phaser: phaser});

  // Extract and parse front matter
  phaser.matter = phaser.matter.init(src, opts);
  var content  = phaser.matter.content;
  var metadata = phaser.matter.context;
  // console.log(phaser.matter);

  // Build up the context
  var context  = _.extend({}, config, opts, opts.metadata || {}, data, metadata);
  delete context.config;

  if(!phaser.matter && !context) {
    throw new Error(phaser.log.error('Phaser: no source files defined.'));
  }

  // Add Table of Contents to templates with: {%= toc %}
  context.toc = phaser.utils.toc(content);

  // Exclude options from context
  context = phaser.exclusions.init(context, opts);

  phaser.options = opts;
  phaser.expand  = phaser.expand(context, opts, {phaser: phaser});
  phaser.log     = lib.log.init(config, opts, {phaser: phaser});
  phaser.verbose = phaser.log.verbose;

  // Initialize plugins
  var pContext = phaser.plugins.init(config, opts, {
    context: data,
    phaser: phaser
  });

  // Initialize filters
  var fContext = phaser.filters.init(config, opts, {
    context: context,
    page: phaser.matter,
    phaser: phaser
  });

  // Extend context with custom filters and filters,
  var ctx = _.defaults({}, metadata, pContext, fContext, context);

  // Initialize Lo-Dash filters (mixins)
  phaser.mixins.init(config, opts, {
    context: ctx,
    page: phaser.matter,
    phaser: phaser
  });

  // Initialize partials
  phaser.partials.init(config, opts, {
    context: ctx,
    page: phaser.matter,
    phaser: phaser
  });

  // Process templates and render content
  var block = phaser.utils.block(config, opts, phaser.matter);
  content = block.block(content);

  var rendered = phaser.template(content, ctx, settings);
  var result = phaser.utils.postProcess(rendered, opts);

  return {
    context: context,
    content: result,
    original: src,
    file: phaser.file,
  };
};

// Read a file, then process with Phaser
phaser.read = function(src, options) {
  var content = file.readFileSync(src);
  return phaser.process(content, _.extend({}, options)).content;
};

// Read a file, process it with Phaser, then write it.
phaser.copy = function(src, dest, options) {
  var opts = _.extend({}, options);
  file.writeFileSync(dest, phaser.read(src, opts));
  phaser.log.success('>> Saved to:', dest);
};

phaser.expand = function(src, dest, options) {
  var opts = _.extend({}, options);
  file.expandMapping(src, dest, opts.glob || {}).map(function(fp) {
    file.writeFileSync(fp.dest, phaser.read(fp.src, opts));
    phaser.log.success('>> Saved to:', fp.dest);
  });
  // Log a success message if everything completed.
  phaser.log.success('\n>> Completed successfully.');
};