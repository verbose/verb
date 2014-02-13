/**
 * write <https://github.com/jonschlinkert/write>
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
var lib   = require('./lib');



/**
 * Export Phaser
 */


var phaser = module.exports = {};

// Extend `phaser`
phaser.cwd        = file.normalizeSlash(cwd());
phaser.base       = file.normalizeSlash(cwd());
phaser.utils      = require('./lib/utils/index');
phaser.template   = require('./lib/template');
phaser.exclusions = require('./lib/exclusions');
phaser.plugins    = require('./lib/plugins');
phaser.filters    = require('./lib/filters');
phaser.partials   = require('./lib/partials');
phaser.matter     = require('./lib/matter');
phaser.mixins     = require('./lib/mixins');
phaser.extensions = {};

/**
 * phaser
 */

phaser.process = function(src, options) {
  var opts = _.extend({verbose: false}, options);
  src = src || '';

  // Template settings
  var settings = _.defaults({}, opts.settings);

  // Extend `phaser`
  phaser.config = require('./lib/config').init(opts.config);
  phaser.context = _.extend({}, phaser.config);
  file.writeJSONSync('tmp/ctx/context-0.json', phaser.context);

  _.extend(phaser.context, opts);
  _.extend(phaser.context, opts.metadata || {});

  file.writeJSONSync('tmp/ctx/context-1.json', phaser.context);

  var data     = lib.data.init(opts);
  _.extend(phaser.context, data);
  file.writeJSONSync('tmp/ctx/context-2.json', phaser.context);

  // Build up the context
  delete phaser.context.config;

  if(!phaser.matter && !context) {
    throw new Error(phaser.log.error('phaser: no source files defined.'));
  }

  phaser.options = opts;
  phaser.log     = lib.log.init(opts, {phaser: phaser});
  phaser.verbose = phaser.log.verbose;

  // Extract and parse front matter
  phaser.page = phaser.matter.init(src, opts);
  var content  = phaser.page.content;
  var metadata = phaser.page.context;

  _.extend(phaser.context, metadata);
  file.writeJSONSync('tmp/ctx/context-3.json', phaser.context);

  // Add Table of Contents to templates with: {%= toc %}
  _.extend(phaser.context, {data: {toc: phaser.utils.toc(content)}});
  file.writeJSONSync('tmp/ctx/context-4.json', phaser.context);

  // Exclude options from context
  phaser.context = phaser.exclusions.init(phaser.context, opts);
  file.writeJSONSync('tmp/ctx/context-5.json', phaser.context);

  // Initialize Lo-Dash filters (mixins)
  _.mixin(phaser.mixins.init(phaser));
  file.writeJSONSync('tmp/ctx/context-6.json', phaser.context);

  // Initialize plugins
  var a = phaser.plugins.init(phaser);
  file.writeJSONSync('tmp/ctx/context-7.json', phaser.context);

  // Initialize filters
  var b = phaser.filters.init(phaser);
  file.writeJSONSync('tmp/ctx/context-8.json', phaser.context);

  // Initialize partials
  var c = phaser.partials.init(phaser);
  file.writeJSONSync('tmp/ctx/context-9.json', phaser.context);

  var ctx = _.extend(phaser.context, a, b, c);
  file.writeJSONSync('tmp/ctx/ctx.json', ctx);

  var rendered = phaser.template(content, phaser.context, settings);
  var result = phaser.utils.postProcess(rendered, opts);

  return {
    context: phaser.context,
    content: result,
    original: src
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

// phaser.process = function(src, options) {
//   return phaser(src, options).content;
// };

// phaser.read = function(src, options) {
//   var content = file.readFileSync(cwd(src));
//   return phaser(content, options).content;
// };

// phaser.write = function(dest, str, options) {
//   options = options || {};
//   var content = phaser(str, options).content;
//   file.writeFileSync(dest, content);
//   phaser.log.success('Saved to', dest);
// };

// phaser.expand = function(src) {
//   return file.expand(src);
// };

// console.log(phaser.process('{%= name %}'));
// console.log(phaser.process('{%= name %}', {name: 'Jon'}));
// console.log(phaser.read('AUTHORS'));
// console.log(phaser.util.authors('AUTHORS'));
// console.log(phaser.write('name.txt', '{%= name %}'));
// console.log(phaser.expand('lib/*.js'));
// // console.log(phaser());
// console.log(phaser.read('AUTHORS'));