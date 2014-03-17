/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var colors = require('../colors');
var origin = require('remote-origin-url');

module.exports = function (verb) {
  var config = verb.config;
  var context = verb.context;
  var utils = verb.utils;

  var homepage = '';

  if (context.homepage) {
    return;
  } else if (config.homepage) {
    return;
  } else if (config.repository.url && config.repository.url.length > 0) {
    homepage = utils.convertUrl(config.repository.url);
  } else if (typeof origin.url() === 'string') {
    homepage = utils.convertUrl(origin.url());
  } else {
    verb.log.warn(colors.yellow('>> No "homepage" URL found.'));
  }
  verb.context.homepage = homepage;
};