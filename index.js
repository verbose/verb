'use strict';

/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

var Base = require('class-extend');
var cwd = require('cwd');
var file = require('fs-utils');
var relative = require('relative');
var toc = require('marked-toc');
var _ = require('lodash');

// Verb modules
var Cache = require('./lib/cache');


/**
 * verb
 */

var verb = module.exports = new Cache();

verb.set('foo', {bar: 'baz'});

/**
 * Initialize API
 */

_.extend(verb, {cwd: cwd});
_.extend(verb, {base: cwd});
_.extend(verb, {docs: verb.cwd('docs')});
_.extend(verb, {ext: '.md'});


// Utils
_.extend(verb, {utils: require('./lib/utils/index')});
_.extend(verb, {file:  require('./lib/file')});

// Logging
_.extend(verb, {log:     require('verbalize')});
_.extend(verb, {verbose: verb.log.verbose});
_.extend(verb, {mode:    verb.log.mode});

// Extensions
_.extend(verb, {plugins: require('./lib/plugins')});
_.extend(verb, {filters: require('./lib/filters')});
_.extend(verb, {tags:    require('./lib/tags')});

// Templates
_.extend(verb, {scaffolds: require('./lib/scaffolds')});
_.extend(verb, {template:  require('./lib/template')});

// Data
_.extend(verb, {config: require('./lib/config')});
_.extend(verb, {data:   require('./lib/data')});
_.extend(verb, {matter: require('./lib/matter')});

// Omitted properties
_.extend(verb, {exclusions: require('./lib/exclusions')});


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

  // Mixin methods from `change-case`
  _.mixin(require('change-case'));

  // Extend the config with core and user-defined mixins
  _.fn = require('./lib/mixins.js');
  _.mixin(_.fn);
};


/**
 * Process Lo-Dash templates using metadata from the user's config as context.
 * e.g. package.json and info from the local git repository.
 */

verb.process = function(src, options) {
  options = _.extend({}, {toc: {maxDepth: 2}}, options);
  verb.options = _.extend({}, verb.options, options);

  var delims = verb.utils.delims;
  src = delims.escape(src || '');

  verb.init(verb.options);

  // Copy the `config` object
  verb.context = _.cloneDeep(verb.config(verb));

  // Delete the `context.config` property
  delete verb.context.config;

  // Extend `verb`
  verb.layout = require('./lib/layout')(verb);

  // Build up the context
  _.extend(verb.context, options);
  _.extend(verb.context, options.metadata || {});

  // Expose Lo-dash template settings to options
  var settings = options.settings || {};

  // Merge in `options.data`
  _.extend(verb.context, verb.data(verb));

  // Extract and parse front matter
  verb.page  = verb.matter(src, options);

  // Extend the context with YAML front matter
  _.extend(verb.context, verb.page.data);

  // Initialize Lo-Dash tags and filters
  _.extend(verb.context, verb.tags(verb));
  _.extend(verb.context, verb.filters(verb));

  // Exclusion patterns, to omit certain options from context
  verb.context = verb.exclusions(verb.context, options);
  _.extend(verb.context, { runner: verb.runner });

   // Initialize plugins
  _.extend(verb.context, verb.plugins(verb));

  // Process templates and render content
  var rendered = verb.template(verb.page.content, verb.context, settings);

  // Post-process
  var result = verb.utils.postProcess(rendered, options);

  // Generate a TOC from <!-- toc --> after all content is included.
  result = toc.insert(result, _.extend(options.toc, verb.context.toc));

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

verb.parse = function(src, options) {
  options = _.extend({}, verb.options, options || {});
  options.src = verb.cwd(src);

  verb.init(options);

  // Log the start.
  verb.verbose.write();
  verb.verbose.inform('processing', relative(src));

  var content = file.readFileSync(src);
  var result = verb.matter(content, options);
  _.extend(verb.options, options);

  return result;
};



/**
 * Read a source file and call `verb.process()`
 *
 * @param {String} src
 * @param {Object} options
 * @return {String} `content` from `verb.process()`
 */

verb.read = function(src, options) {
  options = _.extend({}, verb.options, options || {});
  options.src = verb.cwd(src);

  verb.init(options);

  // Log the start.
  verb.verbose.write();
  verb.verbose.inform('processing', relative(src));

  var content = file.readFileSync(src);
  var result = verb.process(content, options).content;
  _.extend(verb.options, options);

  return result;
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
  options = _.extend({}, verb.options, options || {});
  verb.init(options);

  options.src = verb.cwd(src);
  options.dest = verb.cwd(dest);

  // Log the start.
  verb.verbose.write();
  verb.verbose.subhead('reading', file.normalizeSlash(src));

  // Write the actual files.
  file.writeFileSync(dest, verb.read(src, options));

  _.extend(verb.options, options);
  verb.verbose.inform('writing', relative(dest));

  // Log a success message.
  verb.verbose.write();
  verb.verbose.success('  ' + verb.runner.name + ' [done]');
  return;
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

verb.expand = function(src, dest, options) {
  var opts = _.extend({concat: false}, options);
  opts.glob = opts.glob || {};

  verb.init(opts);

  verb.options = verb.options || {};
  verb.options.dest = verb.cwd(dest);

  _.extend(options, verb.options);

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

  // Log the start.
  verb.log.write();
  verb.log.subhead('expanding', src);

  file.expandMapping(src, defaults).map(function(fp) {
    fp.src.filter(function(filepath) {
      if (!file.exists(filepath)) {
        verb.log.error('  Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    }).map(function(filepath) {
      verb.options.src = filepath;
      verb.log.run('reading', relative(process.cwd(), verb.options.src));

      if(!concat) {
        file.writeFileSync(fp.dest, verb.read(filepath, opts));
        verb.log.subhead('writing', relative(process.cwd(), fp.dest));
      } else {
        defer.push(filepath);
      }
    });
  });

  if(concat) {
    var blob = _.flatten(defer).map(function(filepath) {
      verb.options.src = filepath;

      // Log the start.
      verb.log.run('reading', relative(process.cwd(), verb.options.src));

      return verb.read(filepath, opts);
    }).join(opts.sep);

    file.writeFileSync(dest, blob);
    verb.log.subhead('writing', relative(process.cwd(), dest));
  }

  // Log a success message.
  verb.log.write();
  verb.log.done('done');
};