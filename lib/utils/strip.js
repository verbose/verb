/**
 * Strip newlines and whitespace padding.
 *
 * @name reverse
 * @param  {String} str The string to reverse
 * @return {String}     The reversed string.
 * @api public
 */

module.exports = function(str) {
  str = str || '';
  str = str.replace(/^\s+/gm, '');
  str = str.replace(/\s+$/gm, '');
  str = str.replace(/\n+/gm, ' ');
  return str;
};