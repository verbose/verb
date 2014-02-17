/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(phaser) {
  var config = phaser.config;

  /**
   * Add a copyright statement, with author and year(s) in effect.
   * @param  {Number} startYear Optional parameter to define the start year of the project.
   * @return {String}           Complete copyright statement.
   * @example
   *   {%= _.copyright() %} => Copyright (c) 2014 Jon Schlinkert, contributors.
   *   {%= _.copyright('2012') %} => Copyright (c) 2012-2014 Jon Schlinkert, contributors.
   */

  exports.copyright = function (startYear) {
    var name = config.author.name ? config.author.name : config.name;
    var today = new Date().getFullYear();
    var date = startYear ? startYear + '-' + today : today;
    return 'Copyright (c) ' + date + ' ' + name + ', contributors.';
  };

  return exports;
};
