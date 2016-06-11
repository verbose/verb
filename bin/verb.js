#!/usr/bin/env node

process.env.GENERATE_CLI = true;

var generator =  require('../lib/generator');
var commands = require('../lib/commands');
var utils = require('../lib/utils');
var argv = utils.yargs(process.argv.slice(2));
var Verb = require('..');

/**
 * Listen for errors on all instances
 */

Verb.on('generate.preInit', function(app) {
  app.on('error', function(err) {
    console.log(err.stack);
    process.exit(1);
  });
});

Verb.on('verb.finished', function(app) {
  app.emit('done');
  process.exit();
});

/**
 * Initialize verb CLI
 */

utils.runner(Verb, {name: 'verb'}, argv, function(err, app, ctx) {
  if (err) {
    console.log(err.stack);
    process.exit(1);
  }

  app.on('error', function(err) {
    console.log(err.stack);
    process.exit(1);
  });

  commands(app, ctx);
  var config = app.base.get('cache.config') || {};

  if (!app.generators.defaults) {
    app.register('defaults', require('../lib/generator'));
  }

  app.config.process(config, function(err, config) {
    if (err) app.emit('error', err);

    app.base.del('cache.config');
    app.base.set('cache.config', config);

    app.cli.process(ctx.argv, function(err) {
      if (err) app.emit('error', err);
      Verb.emit('verb.finished', app);
    });
  });
});

