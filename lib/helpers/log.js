'use strict';

var chalk = require('chalk');

/**
 * ```js
 * {%= log("this is a message!") %}
 * ```
 */

module.exports = function (msg) {
  return console.log(msg);
};
