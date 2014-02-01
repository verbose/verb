/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var matter = require('gray-matter');
var chalk = require('chalk');
var file = require('fs-utils');
var glob = require('globule');
var _ = require('lodash');

var success = chalk.green;
var error = chalk.red;

// Internal libs
var template = require('./template');
var utils = require('./utils');

_.mixin({
  docs: function(filepath) {
    var src = path.join('docs', filepath);
    return file.readFileSync(src);
  }
})

var phaser = function(src, options) {
  var opts = _.extend({verbose: false},  options);
  var optsData = utils.expandData(opts.data || {}, opts);
  var config = require('./config').init(opts.config);  // package.json or alt config object
  var meta = require('./meta').init(optsData, opts);   // metadata from mixins

  // Extract and parse front matter
  var content = matter(src).content;
  var metadata = matter(src).context;

  // Build up the context
  var context = _.extend({}, config, meta, opts, optsData, metadata);
  delete context.config;

  // Add Table of Contents to templates with: {%= toc %}
  context.toc = utils.toc(src);

  // Process templates and render content
  var rendered = template(content, context, opts.settings);
  var result = utils.postProcess(rendered, opts);
  return {
    context: context,
    content: result,
    original: src
  };
};


phaser.process = function(src, options) {
  return phaser(src, _.extend({}, options)).content;
};


phaser.read = function(src, options) {
  var content = file.readFileSync(src);
  return phaser.process(content, _.extend({}, options));
};

phaser.copy = function(src, dest, options) {
  var opts = _.extend({}, options);
  file.writeFileSync(dest, phaser.read(src, opts));
};

phaser.expand = function(src, dest, options) {
  // Options defaults
  var opts = _.extend({cwd: 'test', ext: '.md', filters: ''}, options);

  // Globule defaults
  var globOpts = {
    flatten: true,
    matchBase: true,
    prefixBase: false,
    srcBase: opts.cwd,
    destBase: dest,
    ext: opts.ext
  };

  glob.findMapping(src, globOpts).map(function(fp) {
    file.writeFileSync(fp.dest, phaser.read(fp.src, opts));
    console.log(success('>> Saved to:'), fp.dest);
  });
  console.log(success('\n>> Completed successfully.'));
};

// phaser.expand('fixtures/*.tmpl', 'test/actual/', {name: 'foo'});
phaser.expand('docs/README.*', 'test/actual/');


module.exports = phaser;