/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const url = require('url');

module.exports = function (verb) {
  var context = verb.context;
  var repoUrl = '';
  var obj = {};

  // Check for a `repo` property on the context, if it
  // doesn't exist try to create one.
  if(!verb.context.repo) {
    try {
      if (context.repository && context.repository.url) {
        repoUrl = context.repository.url;
      } else if (context.bugs && context.bugs.url) {
        repoUrl = context.bugs.url;
      }

      obj = url.parse(repoUrl);
      var repo = obj.path.replace(/(^\/|\.git$)/g, '');
      verb.context.repo = repo;
    } catch (e) {
      verb.log.warn(e);
    }
  }
};