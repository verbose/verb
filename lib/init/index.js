'use strict';

var init = require('export-files')(__dirname);
var env = require('../env');

/**
 * Load initialization transforms
 */

module.exports = function init_(verb) {
  verb.transform('cwd', init.cwd);
  verb.transform('verb', init.verb);
  verb.transform('pkg', init.pkg);

  verb.transform('env', env.env);
  verb.transform('ignore', init.ignore);
  verb.transform('files', init.files);

  verb.transform('user', env.user);
  verb.transform('keys', env.keys);
  verb.transform('github', env.github);
  verb.transform('travis', env.travis);

  verb.transform('loaders', init.loaders);
  verb.transform('create', init.create);
  verb.transform('options', init.options);
  verb.transform('engines', init.engines);
  verb.transform('helpers', init.helpers);
  verb.transform('plugins', init.plugins);
  verb.transform('middleware', init.middleware);
  verb.transform('load', init.load);
  verb.transform('runner', init.runner);
};
