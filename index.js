/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var configFile = require('config-file');
var cwd = require('cwd');
var pkg = require('./package.json');
var _ = require('lodash');

/**
 * verb
 */

var verb = module.exports = {};


/**
 * Expose metadata from Verb's package.json to
 * the context. Use with `verbMetadata.foo`
 *
 * @api {Private}
 */

verb.verbMetadata = Object.preventExtensions(pkg);

/**
 * Prevent downstream variables from accidentally
 * mutating Verb metadata.
 *
 * @api {Private}
 */

_.forOwn(verb.verbMetadata, function(num, key) {
  Object.defineProperty(verb.verbMetadata, key, {
    writable: false,
    configurable: false
  });
});


/**
 * Initialize API
 */

verb.cwd          = cwd;
verb.base         = cwd;
verb.docs         = verb.cwd('docs');
verb.ext          = '.md';
verb.file         = _.defaults(require('./lib/file'), file);

// Logging and utils
verb.colors       = require('./lib/colors');
verb.utils        = require('./lib/utils/index');
verb.log          = require('./lib/log');
verb.verbose      = verb.log.verbose;
verb.mode         = {};
verb.mode.verbose = false;

// Extensions
verb.plugins      = require('./lib/plugins');
verb.filters      = require('./lib/filters');
verb.tags         = require('./lib/tags');

// Templates
verb.scaffolds    = require('./lib/scaffolds');
verb.template     = require('./lib/template');

// Data
verb.data         = require('./lib/data');
verb.matter       = require('./lib/matter');

verb.exclusions   = require('./lib/exclusions');


/**
 * Allow tools in the Verb ecosystem to specify their
 * own name and url, so that any templates using
 * `runner.name` and `runner.url` will render with
 * that info.
 */

verb.runner = {
  name: 'Verb',
  url: 'https://github.com/assemble/verb'
};


/**
 * If one exists, automatically load the user's
 * runtime config file.
 *
 * @api {private}
 */

verb.verbrc = {};

/**
 * Initialize Verb and the Verb API
 *
 * @api {private}
 */

verb.init = function (options) {
  options = options || {};

  if (verb.initalized) {
    return;
  }

  verb.initalized = true;
  verb.mode.verbose = options.verbose || verb.mode.verbose;

  // Extend the config with core and user-defined mixins
  _.fn = require('./lib/mixins.js');
  _.mixin(_.fn);
};

/**
 * Process Lo-Dash templates using metadata from the user's config as context.
 * e.g. package.json and info from the local git repository.
 */

verb.process = function(src, options) {
  var opts = _.extend({toc: {maxDepth: 2}}, options);
  verb.init(opts);

  // Add runtime config
  var runtimeConfig = {};
  if(opts.verbrc) {
    runtimeConfig = configFile.load(cwd(opts.verbrc));
  } else {
    runtimeConfig = verb.verbrc;
  }

  _.extend(opts, runtimeConfig);

  verb.options = opts;

  verb.config = require('./lib/config').init(opts.config);
  verb.context = _.extend({}, verb.config);
  delete verb.context.config;

  src = src || '';

  // Extend `verb`
  verb.layout = require('./lib/layout')(verb);

  // Build up the context
  _.extend(verb.context, opts);
  _.extend(verb.context, opts.metadata || {});
  _.extend(verb.context, require('./lib/data').init(opts));

  // Template settings
  var settings = _.defaults({}, opts.settings);

  // Initialize Lo-Dash tags and filters
  _.extend(verb.context, verb.tags.init(verb));
  _.extend(verb.context, verb.filters.init(verb));

  // Initialize `options.data`
  _.extend(verb.context, verb.data.init(opts));

  // Extract and parse front matter
  verb.page  = verb.matter.init(src, opts);
  _.extend(verb.context, verb.page.context);

  // Exclusion patterns, to omit certain options from context
  verb.context = verb.exclusions(verb.context, opts);
  _.extend(verb.context, {runner: verb.runner});

   // Initialize plugins
  _.extend(verb.context, verb.plugins.init(verb));

  // Process templates and render content
  var renderDone = false;
  var rendered = verb.template(verb.page.content, verb.context, settings);

  verb.tags.resolve(verb, rendered, function (err, results) {
    rendered = results;
    renderDone = true;
  });

  while (!renderDone) {
    process.nextTick();
  }
  var result = verb.utils.postProcess(rendered, opts);

  // Generate a TOC from <!-- toc --> after all content is included.
  result = require('marked-toc').insert(result, opts.toc);

  return {
    verb: verb,
    context: verb.context,
    content: result,
    original: src
  };
};


/**
 * Read a source file and call `verb.process()`
 *
 * @param {String} src
 * @param {Object} options
 * @return {String} `content` from `verb.process()`
 */

verb.read = function(src, options) {
  options = options || {};
  verb.init(options);

  verb.options = verb.options || {};
  _.extend(verb.options, options)

  var content = file.readFileSync(src);
  return verb.process(content, options).content;
};

/**
 * Read a source file and call `verb.process()`,
 * then write it to the specified `dest`.
 *
 * @param {String} src
 * @param {String} dest
 * @param {Object} options
 * @return {String} `content` from `verb.process()`
 */

verb.copy = function(src, dest, options) {
  options = options || {};
  verb.init(options);

  verb.options = _.extend(verb.options || {}, options);
  verb.options.dest = dest;

  file.writeFileSync(dest, verb.read(src, options));
  verb.log.success('Saved to:', dest);
};


/**
 * Expand globbing patterns into a src-dest mapping calculated
 * based on defaults and user-defined options. Read source files and
 * call `verb.process()`, then write the processed files to the
 * calculated `dest`.
 *
 * @param {String} src
 * @param {String} dest
 * @param {Object} [options] the options to use:
 *        [concat] concatenate dest files. Default `false`
 *        [sep] separator to use between files, if concatenated.
 *        [cwd] current working directory. Default `verb.cwd()`
 *        [ext] extension to use for dest files. Default `verb.ext` (`.md`)
 *        [destBase] the base directory for dest files.
 *        [glob] options to pass to [globule](https://github.com/cowboy/node-globule).
 * @return {String} `content` from `verb.process()`
 */

verb.expandMapping = function(src, dest, options) {
  var opts = _.extend({concat: false}, options);
  opts.glob = opts.glob || {};

  verb.init(opts);


  verb.options = _.extend(verb.options || {}, options);
  verb.options.dest = verb.cwd(dest);

  var defaults = {
    sep: opts.sep || '\n',
    cwd: opts.cwd || verb.cwd('.'),
    ext: verb.ext || opts.ext,
    destBase: dest
  };
  defaults.srcBase = defaults.cwd;

  var concat = opts.concat || file.hasExt(dest) || false;
  var defer = [];

  // Pass users-defined options to globule
  _.extend(defaults, opts.glob);

  file.expandMapping(src, defaults).map(function(fp) {
    fp.src.filter(function(filepath) {
      if (!file.exists(filepath)) {
        verb.log.error('>> Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    }).map(function(filepath) {
      verb.options.src = filepath;
      if(!concat) {
        file.writeFileSync(fp.dest, verb.read(filepath, opts));
        verb.log.success('Saved to', fp.dest);
      } else {
        defer.push(filepath);
      }
    });
  });

  if(concat) {
    var blob = _.flatten(defer).map(function(filepath) {
      return verb.read(filepath, opts);
    }).join(opts.sep);
    file.writeFileSync(dest, blob);
    verb.log.success('Saved to', dest);
  }
};