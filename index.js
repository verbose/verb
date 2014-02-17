/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var path       = require('path');
var configFile = require('config-file');
var file       = require('fs-utils');
var _          = require('lodash');
var cwd        = require('cwd');

/**
 * phaser
 */

var phaser = module.exports = {};

phaser.cwd        = cwd;
phaser.base       = cwd;
phaser.utils      = require('./lib/utils/index');
phaser.file       = _.defaults(require('./lib/file'), file);
phaser.template   = require('./lib/template');
phaser.exclusions = require('./lib/exclusions');
phaser.partials   = require('./lib/partials');
phaser.plugins    = require('./lib/plugins');
phaser.filters    = require('./lib/filters');
phaser.tags       = require('./lib/tags');
phaser.matter     = require('./lib/matter');
phaser.extensions = {};
phaser.ext        = '.md';

/**
 * runtime config
 */

if(file.exists(cwd('.phaserrc'))) {
  phaser.phaserrc =  configFile.load(cwd('.phaserrc'));
} else if(file.exists(cwd('.phaserrc.yml'))) {
  phaser.phaserrc = configFile.load(cwd('.phaserrc.yml'))
} else {
  phaser.phaserrc = {};
}


/**
 * phaser.init
 */

phaser.init = function (options) {
  if (phaser.initalized) {
    return;
  }
  phaser.initalized = true;

  var opts = _.extend({verbose: false}, options);

  // Initialize mixins
  _.fn = require('./lib/mixins.js');
  _.mixin(_.fn);

  // Initalize logging
  phaser.log = require('./lib/log').init(opts, phaser);
  phaser.verbose = phaser.log.verbose;
};


/**
 * phaser.process
 */

phaser.process = function(src, options) {
  var opts = _.extend({}, options);
  phaser.init(opts);

  // Add runtime config
  var runtimeConfig;
  if(opts.phaserrc) {
    runtimeConfig = configFile.load(cwd(opts.phaserrc))
  } else {
    runtimeConfig = phaser.phaserrc;
  }
  _.extend(opts, runtimeConfig);

  phaser.options = opts;

  phaser.config = require('./lib/config').init(opts.config);
  phaser.context = _.extend({}, phaser.config);
  delete phaser.context.config;

  src = src || '';

  // Extend `phaser`
  phaser.layout = require('./lib/layout')(phaser);

  // Build up the context
  _.extend(phaser.context, opts);
  _.extend(phaser.context, opts.metadata || {});
  _.extend(phaser.context, require('./lib/data').init(opts));

  // Template settings
  var settings = _.defaults({}, opts.settings);

  // Extract and parse front matter
  phaser.page  = phaser.matter.init(src, opts);
  var content  = phaser.page.content;
  var metadata = phaser.page.context;

  _.extend(phaser.context, metadata);

  // Initialize plugins
  _.extend(phaser.context, phaser.plugins.init(phaser));

  // Initialize Lo-Dash tags and filters
  _.extend(phaser.context, phaser.tags.init(phaser));
  _.extend(phaser.context, phaser.filters.init(phaser));

  // Initalize partials
  _.extend(phaser.context, phaser.partials.init(phaser));

  // Exclusion patterns, to omit certain options from context
  phaser.context = phaser.exclusions(phaser.context, opts);

  // Process templates and render content
  var rendered = phaser.template(phaser.page.content, phaser.context, settings);
  var result = phaser.utils.postProcess(rendered, opts);

  return {
    context: phaser.context,
    content: result,
    original: src
  };
};


// Read a file, then process with Phaser
phaser.read = function(src, options) {
  var opts = _.extend({}, options);
  phaser.init(opts);

  var content = file.readFileSync(src);
  return phaser.process(content, opts).content;
};

// Read a file, process it with Phaser, then write it.
phaser.copy = function(src, dest, options) {
  var opts = _.extend({}, options);

  phaser.init(opts);
  phaser.options = phaser.options || {};
  phaser.options.dest = dest || phaser.cwd();

  file.writeFileSync(dest, phaser.read(src, opts));
  phaser.log.success('Saved to:', dest);
};

// Expand filepaths
phaser.expandMapping = function(src, dest, options) {
  var opts = _.extend({concat: false}, options);
  phaser.init(opts);

  dest = dest || phaser.cwd();
  phaser.options = phaser.options || {};
  phaser.options.dest = dest || phaser.cwd();

  var defaults = {
    cwd: opts.cwd || phaser.cwd('docs'),
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
