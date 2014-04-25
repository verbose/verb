/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const origin = require('remote-origin-url');

module.exports = function (verb) {
  var context = verb.context;
  var utils = verb.utils;

  var homepage = '';

  if (context.homepage) {
    return;
  } else if (context.homepage) {
    return;
  } else if (context.repository.url && context.repository.url.length > 0) {
    homepage = utils.convertUrl(context.repository.url);
  } else if (typeof origin.url() === 'string') {
    homepage = utils.convertUrl(origin.url());
  } else {
    verb.log.warn(verb.log.yellow('>> No "homepage" URL found.'));
  }

  verb.context.homepage = homepage;
};