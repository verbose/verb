'use strict';

module.exports = require('export-files')(__dirname);

/**
 * Load the project environment. Starting with
 * package.json and .gitignore.
 */

// module.exports = function(app) {
//   app.transform('env env', env.env);
//   app.transform('env ignore', env.ignore);
//   app.transform('env files', env.files);
//   app.transform('env keys', env.keys);
//   app.transform('env github', env.github);
//   app.transform('env travis', env.travis);
//   app.transform('env user', env.user);
//   app.transform('env author', env.author);
//   app.transform('env username', env.username);
//   app.transform('env license', env.license);
//   app.transform('env licenses', env.licenses);
// };
