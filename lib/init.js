'use strict';

var init = require('./transforms/init');
var config = require('./transforms/config');
var mod = require('./transforms/modifiers');
var env = require('./transforms/env');

/**
 * Load initialization transforms
 *
 *  | config
 *  | loaders
 *  | templates
 *  | options
 *  | middleware
 *  | plugins
 *  | load
 *  | engines
 *  | helpers - load helpers last
 */

module.exports = function(app) {
  app.transform('metadata', init.metadata);
  app.transform('ignore', init.ignore);
  app.transform('files', env.files);

  app.transform('env', env.env);
  app.transform('pkg', env.pkg);
  app.transform('keys', env.keys);
  app.transform('paths', env.paths);
  app.transform('cwd', env.cwd);
  app.transform('repo', mod.repository);
  app.transform('author', env.author);
  app.transform('user', env.user);
  app.transform('username', env.username);
  app.transform('github', env.github);
  app.transform('travis', env.travis);
  app.transform('fork', env.fork);
  app.transform('missing', env.missing);

  app.transform('github-url', mod.github_url);
  app.transform('twitter-url', mod.twitter_url);

  app.once('loaded', function () {
    app.transform('defaults', init.defaults);
    app.transform('runner', init.runner);
    app.transform('argv', init.argv);
    app.transform('config', config);
    app.transform('loaders', init.loaders);
    app.transform('create', init.templates);
    app.transform('engines', init.engines);
    app.transform('middleware', init.middleware);
    app.transform('helpers', init.helpers);
    app.transform('load', init.load);
    app.transform('plugins', init.plugins);
    app.emit('init');
  });

  app.once('init', function () {
    app.transform('helpers', init.helpers);
    app.emit('finished');
  });

  app.once('finished', function () {
    app.transform('checkup', init.checkup);
  });
};
