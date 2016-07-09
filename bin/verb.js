#!/usr/bin/env node

process.env.GENERATE_CLI = true;
process.on('exit', function() {
  require('set-blocking')(true);
});

var util = require('util');
var Verb = require('..');
var commands = require('../lib/commands');
var tasks = require('../lib/tasks');
var utils = require('../lib/utils');
var args = process.argv.slice(2);
var argv = utils.parseArgs(args);

/**
 * Listen for errors on all instances
 */

Verb.on('generate.preInit', function(app) {
  app.on('error', function(err) {
    console.log(err.stack);
    process.exit(1);
  });

  app.on('build', function(event, build) {
    if (build && typeof event === 'string' && !build.isSilent) {
      var time = (build && build.time) ? app.log.red(build.time) : '';
      var result = event === 'finished' ? time + ' ' + app.log.green(app.log.check) : time;
      app.log(event, build.key, result);
    }
  });

  app.on('task', function(event, task) {
    if (task && (event === 'finished' || event === 'starting') && !task.isSilent) {
      app.log(event, task.key, app.log.red(task.time));
    }
  });
});

/**
 * Initialize CLI
 */

Verb.on('generate.postInit', function(app) {
  if (app.macros.has(args)) {
    app.macros.set(args);
    var macro = {};
    macro[args[0]] = args.slice(2).join(' ');
    console.log('saved macro:', util.inspect(macro));
    process.exit();
  }

  var idx = utils.firstIndex(args, ['-D', '--default']);
  if (idx !== -1) {
    var del = args.indexOf('--del') !== -1;
    if (del) {
      app.base.store.del('defaultTask');
    } else {
      args.splice(idx, 1);
      app.base.store.set('defaultTask', args);
    }
  }
});

/**
 * Initialize Runner
 */

var options = {name: 'verb'};

utils.runner(Verb, options, argv, function(err, app, runnerContext) {
  if (err) handleErr(app, err);

  app.set('cache.runnerContext', runnerContext);
  commands(app, runnerContext);

  if (!app.generators.defaults) {
    app.register('defaults', require('../lib/generator'));
  }

  var ctx = utils.extend({}, runnerContext);
  var config = app.get('cache.config') || {};
  ctx.argv.tasks = [];

  app.config.process(config, function(err, config) {
    if (err) return handleErr(app, err);

    app.base.cache.config = config;

    app.cli.process(ctx.argv, function(err) {
      if (err) return handleErr(app, err);

      var arr = tasks(app, ctx, argv);
      app.log.success('running tasks:', arr);
      app.generate(arr, function(err) {
        if (err) handleErr(app, err);
      });
    });
  });
});

/**
 * Handle errors
 */

function handleErr(app, err) {
  if (app && app.base.hasListeners('error')) {
    app.base.emit('error', err);
  } else {
    console.log(err.stack);
    process.exit(1);
  }
}
