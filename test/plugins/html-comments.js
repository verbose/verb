var file = require('fs-utils');
var glob = require('globule');


module.exports = function(phaser) {
  var content = phaser.page.content;

  /**
   * Convert HTML comments to valid Lo-Dash
   * templates This example only works with
   * "include" syntax, e.g. `{%= foo('something') %}`,
   * not regular variables, e.g. `{% foo %}`
   *
   * @param   {String}  str  Source content
   * @return  {String}
   */

  var convert = function(str) {
    return str.replace(/<!--\s*([\S]+)\(([\S]+)\)\s*-->/g, '{%= $1($2) %}');
  };

  phaser.page.content = convert(content);
};
