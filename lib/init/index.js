'use strict';

var init = require('export-files')(__dirname);
var env = require('../env');

/**
 * Load initialization transforms
 */

module.exports = function init_(verb) {
  // verb.transform('data', init.data);
  verb.transform('init cwd', init.cwd);
  verb.transform('init verb', init.verb);
  verb.transform('init pkg', init.pkg);
  verb.transform('init env', env);
  verb.transform('init loaders', init.loaders);
  verb.transform('init create', init.create);
  verb.transform('init load', init.load);
  verb.transform('init runner', init.runner);
  verb.transform('init options', init.options);
  verb.transform('init engines', init.engines);
  verb.transform('init helpers', init.helpers);
  verb.transform('init plugins', init.plugins);
  verb.transform('init middleware', init.middleware);
  // console.log(verb.get('missing'));
};
