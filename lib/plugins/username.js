/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

module.exports = function (verb) {
  if(!verb.context.username) {
    try {
      var username = verb.context.repo.split('/')[0];

      verb.context.username = username;
    } catch(e) {
      e.origin = __filename;
      var msg = 'Cannot find "username" on the context. ';
      console.warn(msg + e);
    }
  }
};