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

var Verb = create(function(app, base, env) {
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

Verb.mixin(utils.runner('verb', 'verbApp', preload));

/**
 * Get the `base` instance of verb to use for
 * registering all other instances. This will either
 * be local to the user (e.g. `node_modules/verb`)
 * or a globally installed module
 */

var verb = Verb.getConfig('verbfile.js', __dirname);
verb.on('error', function(err) {
  console.log(err.stack);
});

// get `verb` property from package.json, if it exists
var userConfig = verb.get('env.user.pkg.verb');
if (userConfig) {
  verb.config.process(userConfig);
}

// else if (!verb.get('env.user.pkg') || !fs.existsSync('.verb.md')) {
//   verb.emit('config-processed');
//   verb.enable('ask.verbmd');
// }
verb.emit('config-processed');


/**
 * Resolve user config files, eg. `verbfile.js`.
 */

verb.resolve({pattern: 'verb-*/verbfile.js', cwd: gm});

/**
 * Run verbApps and tasks
 */

verb.cli.map('verbApps', function(tasks) {
  // ensure this is run after other configuration is complete
  setImmediate(function() {
    // preload(verb, verb.base, verb.env);
    verb.questions.set('verbmd', 'Looks like ".verb.md" is missing, want to add one?');
    // verb.data(verb.get('env.user.pkg') || {});

    if (verb.enabled('ask.verbmd')) {
      verb.ask('verbmd', function(err, answers) {
        if (err) throw err;

        if (!answers.verbmd) {
          console.log('no worries!');
          return;
        }

        console.log('got it! copying now.');

        verb.build('verbmd', function(err) {
          if (err) throw err;
          console.log('done!');
        });
      });
      return;
    }

    if (verb.enabled('tasks.display')) {
      console.log(utils.colors.gray(' List of verbApps and their registered tasks:'));
      verb.displayTasks();
      utils.timestamp('done');
      return;
    }

    if (verb.enabled('tasks.choose')) {
      verb.chooseTasks(function(err, results) {
        if (err) throw err;
        run([results.verbApps]);
      });
      return;
    }

    if (!tasks.length) {
      if (verb.tasks.hasOwnProperty('default')) {
        tasks = [{verb: ['default']}];
      } else {
        console.log(' no default task is defined.');
        utils.timestamp('done');
        return;
      }
    }

    run(tasks);
    function run(tasks) {
      data.updateData(verb, verb.base, verb.env);

      verb.on('error', function(err) {
        console.log(err);
        process.exit(1);
      });

      verb.runVerbApps(tasks, function(err) {
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
