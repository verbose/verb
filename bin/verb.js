#!/usr/bin/env node

var runtimes = require('base-runtimes');
var Verb = require('..');
var verb = new Verb();

// register default "fallback" generator
verb.register('fallback', require('../lib/generators/default'));
verb.register('verbfile', require('../lib/generators/verbfile'));
verb.register('verbmd', require('../lib/generators/verbmd'));

// run generator and/or tasks
verb.runner('verbfile.js', function(err, argv, app) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }

  this.use(runtimes(config));
  // var app = verb.getGenerator('default');
  var config = this.loadSettings(argv);
  this.set('cache.config', config);

  this.config.process(config, function(err) {
    if (err) throw err;


    app.cli.process(argv, function(err) {
      if (err) throw err;

      verb.emit('done');
      process.exit(0);
    });
  });
});
