/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');

module.exports = function (verb) {
  var config = verb.config;
  var repoUrl = '';
  var obj = {};

  // Check for a `repo` property on the context, if it
  // doesn't exist try to create one.
  if(!verb.context.repo) {
    try {
      if (config.repository && config.repository.url) {
        repoUrl = config.repository.url;
      } else if (config.bugs && config.bugs.url) {
        repoUrl = config.bugs.url;
      }

      obj = url.parse(repoUrl);
      var repo = obj.path.replace(/(^\/|\.git$)/g, '');
      verb.context.repo = repo;
    } catch (e) {
      verb.log.warn(e);
    }
  }
};