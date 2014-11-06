'use strict';

var stringify = require('stringify-author');
var _ = require('lodash');

/**
 * Add a copyright statement, with author and year(s) in effect.
 *
 * ```js
 * {%= copyright() %}
 * //=> Copyright (c) 2014 Jon Schlinkert, contributors.
 *
 * {%= copyright({year: 2012}) %}
 * //=> Copyright (c) 2012-2014 Jon Schlinkert, contributors.
 * ```
 *
 * @param  {Number} `year` Optionally pass the start year of the project.
 * @return {String} Complete copyright statement.
 */

module.exports = function (options) {
  var context = _.extend({author: {}}, this.context, options);
  var current = new Date().getFullYear();
  var str = 'Copyright (c) ';

  // if `year` is passed, create a date range
  str += context.year
    ? (context.year + '-' + current)
    : current;

  str += ' ';
  str += typeof context.author === 'string'
    ? context.author
    : context.author.name;

  // We need the spaces at the end to ensure
  // that a newline is used by gfm
  return str + ', contributors.  ';
};