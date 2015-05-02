'use strict';

var mod = require('./transforms/modifiers');
var init = require('./transforms/init');
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

module.exports = function init_(verb) {
  verb.transform('metadata', init.metadata);
  verb.transform('args', init.args);
  verb.transform('ignore', init.ignore);
  verb.transform('files', env.files);

  verb.transform('env', env.env);
  verb.transform('pkg', env.pkg);
  verb.transform('keys', env.keys);
  verb.transform('paths', env.paths);
  verb.transform('cwd', env.cwd);
  verb.transform('author', env.author);
  verb.transform('user', env.user);
  verb.transform('username', env.username);
  verb.transform('github', env.github);
  verb.transform('travis', env.travis);
  verb.transform('missing', env.missing);

  verb.transform('github-url', mod.github_url);
  verb.transform('twitter-url', mod.twitter_url);

  verb.once('loaded', function () {
    verb.transform('config', init.config);
    verb.transform('runner', init.runner);
    verb.transform('defaults', init.defaults);
    verb.transform('loaders', init.loaders);
    verb.transform('create', init.create);
    verb.transform('engines', init.engines);
    verb.transform('middleware', init.middleware);
    verb.transform('helpers', init.helpers);
    verb.transform('load', init.load);
    verb.transform('plugins', init.plugins);
    verb.emit('init');
  });

  verb.once('init', function () {
    verb.transform('helpers', init.helpers);
  });
};
