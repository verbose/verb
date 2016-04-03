#!/usr/bin/env node

process.env.GENERATE_CLI = true;
var verb = require('..');

/**
 * Create verb "runner"
 */

var cli = verb.runner('verbfile.js', require('../lib/generator'));
var app = verb();

app.on('done', function() {
  process.exit(0);
});

/**
 * Run generators and tasks
 */

cli(app, function(err, argv, app) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  app.emit('done');
});
