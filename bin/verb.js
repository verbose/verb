#!/usr/bin/env node

process.env.GENERATE_CLI = true;

var argv = require('minimist')(process.argv.slice(2));
var runner = require('base-runner');
var commands = require('../lib/commands');
var Verb = require('..');

// lift-off options
var options = {
  name: 'verb',
  runner: require('../package'),
  lookup: lookup
};

/**
 * Initialize verb CLI
 */

runner(Verb, options, argv, function(err, app, runnerContext) {
  if (err) app.handleError(err);

  /**
   * Register `verb` generator and tasks
   */

  app.register('verb', require('../lib/generator'));

  /**
   * Load custom commands
   */

  commands(app, runnerContext);

  // get the config object from package.json
  var config = app.pkg.get(runnerContext.env.name);
  var args = app.argv(runnerContext.argv);

  // set parsed and unparsed argv on `cache`
  app.set('cache.argv', {
    orig: argv,
    parsed: runnerContext.argv,
    processed: args
  });

  if (config && !args.noconfig) {
    app.set('cache.config', config);
  }

  app.option('runner.new', 'files');
  app.option(argv);

  /**
   * Custom `lookup` function, for resolving generators
   */

  app.option('lookup', lookup(app));

  /**
   * Process argv
   */

  if (args.init === true) {
    app.cli.process({init: true}, function(err, obj) {
      if (err) app.emit('error', err);
      delete obj.init;
      run(app, obj);
    });
  } else {
    run(app, args);
  }
});

/**
 * cli process
 */

function run(app, args) {
  app.cli.process(args, function(err, obj) {
    if (err) app.emit('error', err);

    app.emit('done');
    process.exit();
  });
}

/**
 * Custom lookup function for resolving generators
 */

function lookup(app) {
  return function(key) {
    var patterns = [`verb-${key}-generator`, key];
    if (app.enabled('generators')) {
      patterns.push(`generate-${key}`);
    }
    return patterns;
  }
}
