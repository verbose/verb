'use strict';

var init = require('./transforms/init');
var env = require('./transforms/env');

/**
 * Load initialization transforms
 *
 *  | runner
 *  | loaders
 *  | create
 *  | options
 *  | middleware
 *  | plugins
 *  | load
 *  | engines
 *  | helpers - load helpers last
 */

module.exports = function init_(verb) {
  verb.transform('cwd', init.cwd);
  verb.transform('verb', init.verb);
  verb.transform('pkg', init.pkg);

  verb.transform('env', env.env);
  // verb.transform('ignore', init.ignore);
  // verb.transform('files', init.files);

  verb.transform('keys', env.keys);
  verb.transform('github', env.github);
  verb.transform('travis', env.travis);
  verb.transform('user', env.user);
  verb.transform('username', env.username);
  verb.transform('author', env.author);

  verb.transform('options', init.options);
  verb.transform('loaders', init.loaders);
  verb.transform('create', init.create);
  verb.transform('middleware', init.middleware);
  verb.transform('plugins', init.plugins);
  verb.transform('load', init.load);
  verb.transform('engines', init.engines);
  verb.transform('helpers', init.helpers);
  verb.transform('runner', init.runner);
};
