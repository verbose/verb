#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var gm = require('global-modules');
var processArgv = require('base-argv').processArgv();
var minimist = require('minimist');
var defaults = require('./lib/runner/defaults');
var preload = require('./lib/runner/preload');
var data = require('./lib/runner/data');
var utils = require('./lib/utils');
var colors = utils.colors;
var Verb = require('./');
var create = Verb.create;

// parse argv
var args = minimist(process.argv.slice(2), {
  alias: {verbose: 'v'}
});

/**
 * Use Verb's static `create` method to pre-load CLI-specific
 * plugins and middleware onto each instance created. In essence
 * this creates a custom `Verb` constructor .
 */

Verb = create(function(app, base, env) {
  return preload(app, base, env || app.env);
});

/**
 * Register `runner` mixin with `Verb`, wich pre-loads
 * CLI-specific methods onto our custom constructor.
 *
 * We also pass the `runner` function so that any user-
 * defined `Verb` constructors will also be pre-loaded
 * with our CLI plugins and middeware.
 */

Verb.mixin(utils.runner('verb', 'app', preload));

/**
 * Get the `base` instance of verb to use for
 * registering all other instances. This will either
 * be local to the user (e.g. `node_modules/verb`)
 * or a globally installed module
 */

var verb = Verb.getConfig('verbfile.js', __dirname);

// get `verb` property from package.json, if it exists
var pkg = verb.get('env.user.pkg');
var userConfig = pkg.verb;

if (userConfig) {
  var config = utils.expandConfig(userConfig, pkg);
  verb.config.process(config);
  verb.emit('config-loaded');
}

/**
 * Resolve user config files, eg. `verbfile.js`.
 */

verb.resolve('default', {pattern: 'verbfile.js', cwd: __dirname});
verb.resolve('global', {pattern: 'verb-*/verbfile.js', cwd: gm});

/**
 * Run apps and tasks
 */

verb.cli.map('apps', function(tasks) {
  // ensure this is run after other configuration is complete
  setImmediate(function() {
    if (verb.enabled('generate.init')) {

    }

    if (verb.enabled('tasks.display')) {
      console.log(colors.gray(' Verb apps and registered tasks:'));
      verb.displayTasks();
      utils.timestamp('done');
      return;
    }

    if (verb.enabled('tasks.choose')) {
      verb.chooseTasks(function(err, results) {
        if (err) throw err;
        run([results.apps]);
      });
      return;
    }

    if (!tasks.length) {
      if (verb.tasks.hasOwnProperty('default')) {
        tasks = [{base: ['default']}];
      } else {
        console.log(' no default task is defined.');
        utils.timestamp('done');
        return;
      }
    }

    run(tasks);
    function run(tasks) {
      data.updateData(verb, verb.base, verb.env);

      verb.runApps(tasks, function(err) {
        if (err) return console.error(err);
        utils.timestamp('done');
        process.exit(0);
      });
    }
  });
});

/**
 * Process args
 */

verb.cli.processArgv(args);
