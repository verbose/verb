#!/usr/bin/env node

process.env.VERB_CLI = true;

var Verb = require('..');
var verb = new Verb();

// run generator and/or tasks
verb.runner('verbfile.js', function(err, argv, app) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (!app.hasConfigfile) {
    app.register('default', require('../lib/generators/default'));
  }

  app.on('error', function(err) {
    console.log(app.env);
    console.log();

    if (err.reason) {
      console.log(err.reason);
      process.exit(1);
    }
  });

  var config = app.get('cache.config');

  app.config.process(config, function(err) {
    if (err) throw err;

    app.cli.process(argv, function(err) {
      if (err) throw err;

      verb.emit('done');
      process.exit(0);
    });
  });
});
