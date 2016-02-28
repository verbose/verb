#!/usr/bin/env node

process.env.GENERATE_CLI = true;
var generator = require('../lib/generator');
var verb = require('..');

/**
 * Create verb "runner"
 */

var run = verb.runner('verbfile.js', generator);
var app = verb();

app.on('done', function() {
  process.exit(0);
});

/**
 * Run generators and tasks
 */

run(app, function(err, argv, app) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  app.emit('done');
});
