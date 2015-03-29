'use strict';

var env = require('export-files')(__dirname);

/**
 * Load the project environment. Starting with
 * package.json and .gitignore.
 */

module.exports = function env_(verb) {
  verb.transform('env env', env.env);
  verb.transform('env ignore', env.ignore);
  verb.transform('env files', env.files);
  verb.transform('env keys', env.keys);
  verb.transform('env github', env.github);
  verb.transform('env travis', env.travis);
  verb.transform('env user', env.user);
  verb.transform('env author', env.author);
  verb.transform('env username', env.username);
  verb.transform('env license', env.license);
  verb.transform('env licenses', env.licenses);
};
