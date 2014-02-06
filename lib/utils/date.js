/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';


/**
 * Date functions used in _.date() filter
 *
 * @name formatDate
 * @param  {Object} dateobj The date object to format.
 * @param  {String} pattern The pattern to use, e.g. 'YYYY-MM-DD'.
 * @return {String}         The formatted date.
 */

module.exports = function(dateobj, pattern) {
  /* jshint unused: false */
  var fallback = 'YYYY-MMM-DD DDD';
  var year = dateobj.getFullYear();
  var month = ('0' + (dateobj.getMonth() + 1)).slice(-2);
  var date = ('0' + dateobj.getDate()).slice(-2);
  var hours = ('0' + dateobj.getHours()).slice(-2);
  var minutes = ('0' + dateobj.getMinutes()).slice(-2);
  var seconds = ('0' + dateobj.getSeconds()).slice(-2);
  var day = dateobj.getDay();
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dates = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'];
  var output = '';

  pattern = pattern || fallback;
  switch (pattern) {
  case 'YYYY-MM-DD':
    output = year + '-' + month + '-' + date;
    break;
  case 'YYYY':
    output = year;
    break;
  case 'full':
    output = dates[parseInt(day)] + ', ' + months[parseInt(month) - 1] + ' ' + date + ', ' + year;
    break;
  }
  return output;
};