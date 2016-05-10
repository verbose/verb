#!/usr/bin/env node

process.env.GENERATE_CLI = true;

var generator =  require('../lib/generator');
var commands = require('../lib/commands');
var utils = require('../lib/utils');
var argv = utils.yargs(process.argv.slice(2));
var Verb = require('..');

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
  app.register('defaults', require('../lib/generator'));
  app.option('lookup', lookup(app));

  app.cli.process(ctx.argv, function(err) {
    if (err) app.emit('error', err);
    app.emit('done');
    process.exit();
  });
});

/**
 * Custom lookup function for resolving generators
 */

function lookup(app) {
  return function(key) {
    var patterns = [key];
    if (!/^verb-([^-]+)-generator/.test(key)) {
      patterns.unshift(`verb-${key}-generator`);
    }

    if (app.enabled('generators')) {
      patterns.push(`generate-${key}`);
    }
    return patterns;
  }
}
