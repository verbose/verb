/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

/**
 * Add a copyright statement, with author and year(s) in effect.
 * @param  {Number} startYear Optional parameter to define the start year of the project.
 * @return {String}           Complete copyright statement.
 * @example
 *   {%= _.copyright() %} => Copyright (c) 2014 Jon Schlinkert, contributors.
 *   {%= _.copyright('2012') %} => Copyright (c) 2012-2014 Jon Schlinkert, contributors.
 */
module.exports = function(config, options) {

  return function (startYear) {
    var name = config.author.name ? config.author.name : config.name;
    var today = new Date().getFullYear();
    var date = startYear ? startYear + '-' + today : today;
    return 'Copyright (c) ' + date + ' ' + name + ', contributors.';
  };
};