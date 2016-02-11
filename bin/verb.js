#!/usr/bin/env node

process.env.GENERATE_CLI = true;
var Verb = require('..');
var verb = new Verb();

/**
 * Run verb generators and tasks
 */

verb.runner('verbfile.js', function(err, argv, app) {
  if (err) handleError(err);

  /**
   * If the user does not have a `verbfile.js`, and the `default`
   * task is defined, register a default fallback.
   */

  if (!app.hasConfigfile && app.isDefaultTask) {
    app.register('default', require('../lib/generators/default'));
  }

  /**
   * Listen for errors
   */

  app.on('error', function(err) {
    console.log(app.env);
    console.log();

    if (err.reason) {
      console.log(err.reason);
      process.exit(1);
    }
  });

  /**
   * Get the `config` object created by base-runner. This object
   * is created by merging any or all of the following objects after
   * normalizing them against a a schema:
   *
   * - globally stored settings, defined via `app.store.set()` or `--save=foo:bar`
   * - options defined on verb's API
   * - the `verb` object in package.json
   * - argv, command line arguments
   */

  var config = app.get('cache.config');

  // Map over config values
  app.config.process(config, function(err) {
    if (err) handleError(err);

    // Process command line arguments
    app.cli.process(argv, function(err) {
      if (err) handleError(err);

      verb.emit('done');
      process.exit(0);
    });
  });
});

// placeholder
function handleError(err) {
  console.log(err);
  process.exit(1);
}
