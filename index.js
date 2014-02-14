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

/**
 * phaser
 */

var phaser = module.exports = {};

phaser.cwd        = file.normalizeSlash(cwd());
phaser.base       = file.normalizeSlash(cwd());
phaser.utils      = require('./lib/utils/index');
phaser.template   = require('./lib/template');
phaser.exclusions = require('./lib/exclusions');
phaser.partials   = require('./lib/partials');
phaser.plugins    = require('./lib/plugins');
phaser.filters    = require('./lib/filters');
phaser.matter     = require('./lib/matter');
phaser.mixins     = require('./lib/mixins');
phaser.extensions = {};
phaser.ext        = '.md';


/**
 * phaser.process
 */

phaser.process = function(src, options) {
  var opts = _.extend({verbose: false}, options);
  phaser.options = opts;

  src = src || '';

  // Template settings
  var settings = _.defaults({}, opts.settings);

  // Extend `phaser`
  phaser.config = require('./lib/config').init(opts.config);
  phaser.context = _.extend({}, phaser.config);
  phaser.layout = require('./lib/layout')(phaser);

  _.extend(phaser.context, opts);
  _.extend(phaser.context, opts.metadata || {});
  _.extend(phaser.context, require('./lib/data').init(opts));

  // Build up the context
  delete phaser.context.config;

  phaser.log = require('./lib/log').init(opts, phaser);
  phaser.verbose = phaser.log.verbose;

  // Extract and parse front matter
  phaser.page = phaser.matter.init(src, opts);
  var content = phaser.page.content;
  var metadata = phaser.page.context;

  _.extend(phaser.context, metadata);

  // Add Table of Contents to templates with: {%= toc %}
  _.extend(phaser.context, {toc: phaser.utils.toc(content)});

  // Exclusion patterns, to omit certain options from context
  phaser.context = phaser.exclusions(phaser.context, opts);

  // Initialize Lo-Dash filters (mixins)
  _.extend(phaser.context, phaser.plugins.init(phaser));
  _.extend(phaser.context, phaser.partials.init(phaser));
  _.extend(phaser.context, phaser.filters.init(phaser));

  // Initialize mixins
  _.mixin(phaser.mixins.init(phaser));

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
  phaser.log.success('Saved to:', dest);
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

phaser.expandMapping = function(src, dest, options) {
  var opts = _.extend({concat: false}, options);
  var defaults = {
    cwd: file.normalizeSlash(cwd(opts.cwd || 'docs')),
    ext: phaser.ext || opts.ext,
    destBase: dest
  };

  var concat = opts.concat || file.hasExt(dest) || false;
  var defer = [];
  var count = 0;

  file.expandMapping(src, defaults).map(function(fp) {
    fp.src.filter(function(filepath) {
      if (!file.exists(filepath)) {
        phaser.log.error('>> Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    }).map(function(filepath) {
      if(!concat) {
        count++;
        file.writeFileSync(fp.dest, phaser.read(filepath, opts));
        phaser.log.success('Saved to', fp.dest);
      } else {
        count = 1;
        defer.push(filepath);
      }
    });
  });

  if(concat) {
    var blob = defer.map(function(filepath) {
      return phaser.read(filepath, opts);
    }).join('\n');
    file.writeFileSync(dest, blob);
    phaser.log.success('Saved to', dest);
  }

  if(count > 1) {
    phaser.log.success(count, 'files generated.');
  }

  if(count === 0) {
    phaser.log.error('\nFailed.');
  }
};

// phaser.write = function(dest, str, options) {
//   options = options || {};
//   var content = phaser(str, options).content;
//   file.writeFileSync(dest, content);
//   phaser.log.success('Saved to', dest);
// };


// console.log(phaser.process('{%= name %}').content);
// console.log(phaser.process('{%= name %}', {name: 'Jon'}).content);
// console.log(phaser.read('AUTHORS'));
// console.log(phaser.utils.authors('AUTHORS'));
// console.log(phaser.write('name.txt', '{%= name %}'));
// console.log(phaser.expand('lib/*.js'));