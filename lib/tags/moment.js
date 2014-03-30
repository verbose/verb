/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const moment = require('moment');

module.exports = function () {
  var normalize = function (date, format) {
    if (moment.isMoment(date)) {
      return date.format(format);
    } else {
      return moment(date).format(format);
    }
  };

  exports.date = function (date, format, options) {
    options = options || {};
    moment.lang(options.lang || 'en');

    if(format === 'today') {
      format = 'MMMM DD, YYYY';
    }

    if (typeof date === 'undefined') {
      return moment().format('MMMM DD, YYYY');
    } else if (typeof format === 'undefined') {
      return moment().format(date);
    } else if (typeof format === 'object') {
      options = format;
      format = 'MMMM DD, YYYY';
      return normalize(date, format);
    } else {
      return moment();
    }
  };
  return exports;
};