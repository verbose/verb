'use strict';

var init = require('export-files')(__dirname);
var env = require('../env');

/**
 * Load initialization transforms
 */

// module.exports = function init_(verb) {
//   // verb.transform('data', init.data);
//   verb.transform('init cwd', init.cwd);
//   verb.transform('init verb', init.verb);
//   verb.transform('init pkg', init.pkg);
//   verb.transform('init env', env);
//   verb.transform('init loaders', init.loaders);
//   verb.transform('init create', init.create);
//   verb.transform('init load', init.load);
//   verb.transform('init runner', init.runner);
//   verb.transform('init options', init.options);
//   verb.transform('init engines', init.engines);
//   verb.transform('init helpers', init.helpers);
//   verb.transform('init plugins', init.plugins);
//   verb.transform('init middleware', init.middleware);
// };


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

  verb.transform('loaders', init.loaders);
  verb.transform('create', init.create);
  verb.transform('options', init.options);
  verb.transform('helpers', init.helpers);
  verb.transform('engines', init.engines);
  verb.transform('middleware', init.middleware);
  verb.transform('plugins', init.plugins);
  verb.transform('load', init.load);
  verb.transform('runner', init.runner);
};
