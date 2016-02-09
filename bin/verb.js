#!/usr/bin/env node

process.env.VERB_CLI = true;
var Verb = require('..');
var verb = new Verb();

// run generator and/or tasks
verb.runner('verbfile.js', function(err, opts, app) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (!app.hasConfigfile) {
    app.register('default', require('../lib/generators/default'));
  }

  app.config.process(opts, function(err) {
    if (err) throw err;

    app.cli.process(opts, function(err) {
      if (err) throw err;

      verb.emit('done');
      process.exit(0);
    });
  });
});
