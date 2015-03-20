'use strict';

var path = require('path');
var init = require('export-files')(__dirname);
var env = require('../env');

/**
 * Load initialization transforms
 */

module.exports = function init_(verb) {
  verb.transform('verb', init.verb);
  verb.transform('runner', init.runner);
  verb.transform('pkg', init.pkg(verb));

  verb.transform('env', env.env(verb));
  verb.transform('user', env.user(verb));
  verb.transform('github', env.github(verb));
  verb.transform('travis', env.travis(verb));

  verb.transform('loaders', init.loaders);
  verb.transform('create', init.create);
  verb.transform('options', init.options);
  verb.transform('engines', init.engines);
  verb.transform('helpers', init.helpers);
  verb.transform('plugins', init.plugins);
  verb.transform('middleware', init.middleware);
  verb.transform('load', init.load);
};
