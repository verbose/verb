/**
 * Convert HTML comments to valid Lo-Dash
 * templates This example only works with
 * "include" syntax, e.g. `{%= foo('something') %}`,
 * not regular variables, e.g. `{% foo %}`
 *
 * @param   {String}  str  Source content
 * @return  {String}
 */

module.exports = function(verb) {
  var content = verb.page.content;

  function convert(str) {
    return str.replace(/<!--\s*([\S]+)\(([\S]+)\)\s*-->/g, '{%= $1($2) %}');
  }

  verb.page.content = convert(content);
};
