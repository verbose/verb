#!/usr/bin/env node

var path = require('path');
var gm = require('global-modules');
var processArgv = require('base-argv').processArgv();
var minimist = require('minimist');
var runner = require('./lib/runner/runner');
var utils = require('./lib/utils');
var create = require('./').create;

// parse argv
var args = minimist(process.argv.slice(2), {
  alias: {verbose: 'v'}
});

/**
 * Use Verb's static `create` method to pre-load CLI-specific
 * plugins and middleware onto each instance created. In essence
 * this creates a custom `Verb` constructor .
 */

var Verb = create(runner);

/**
 * Register `runner` mixin with `Verb`, wich pre-loads
 * CLI-specific methods onto our custom constructor.
 *
 * We also pass the `runner` function so that any user-
 * defined `Verb` constructors will also be pre-loaded
 * with our CLI plugins and middeware.
 */

Verb.mixin(utils.runner('verb', 'verbApp', runner));

/**
 * Get the `base` instance of verb to use for
 * registering all other instances. This will either
 * be local to the user (e.g. `node_modules/verb`)
 * or a globally installed module
 */

var verb = Verb.getConfig('verbfile.js', __dirname);

/**
 * Resolve user config files, eg. `verbfile.js`.
 */

verb.resolve({pattern: 'verb-*/verbfile.js', cwd: gm});

/**
 * Run verbApps and tasks
 */

verb.cli.map('verbApps', function(verbApps) {
  if (!verbApps.length) {
    if (verb.tasks.hasOwnProperty('default')) {
      verbApps = [{base: ['default']}];
    } else {
      console.log(' no default task is defined.');
      utils.timestamp('done');
      return;
    }
  }

  verb.on('error', function(err) {
    console.log(err);
    process.exit(1);
  });

  verb.runVerbApps(verbApps, function(err) {
    if (err) return console.error(err);
    utils.timestamp('done');
  });
});

/**
 * Process args
 */

verb.cli.process(args);
