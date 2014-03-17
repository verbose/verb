/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(verb) {
  var config = verb.config;

  /**
   * Add a copyright statement, with author and year(s) in effect.
   * @param  {Number} startYear Optional parameter to define the start year of the project.
   * @return {String}           Complete copyright statement.
   * @example
   *   {%= _.copyright() %} => Copyright (c) 2014 Jon Schlinkert, contributors.
   *   {%= _.copyright('2012') %} => Copyright (c) 2012-2014 Jon Schlinkert, contributors.
   */

  var author;
  if(config.author && config.author.name) {
    author = config.author.name;
  } else if (config.author && typeof config.author === 'string') {
    author = config.author;
  }

  exports.copyright = function (startYear) {
    var today = new Date().getFullYear();
    var date = startYear ? startYear + '-' + today : today;
    verb.context.copyright = 'Copyright (c) '+date+' '+author+', contributors.';
    return verb.context.copyright;
  };

  return exports;
};