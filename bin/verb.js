#!/usr/bin/env node

process.env.VERB_CLI = true;
var runtimes = require('base-runtimes');
var Verb = require('..');
var verb = new Verb();

// register default "fallback" generator
verb.register('fallback', require('../lib/generators/default'));
verb.register('generator', require('../lib/generators/generator'));
verb.register('verbfile', require('../lib/generators/verbfile'));
verb.register('verbmd', require('../lib/generators/verbmd'));

// run generator and/or tasks
verb.runner('verbfile.js', function(err, argv, app) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  app.use(runtimes(config));

  var config = app.loadSettings(argv);
  app.set('cache.config', config);

  app.config.process(config, function(err) {
    if (err) throw err;

    app.cli.process(argv, function(err) {
      if (err) throw err;

      verb.emit('done');
      process.exit(0);
    });
  });
});
