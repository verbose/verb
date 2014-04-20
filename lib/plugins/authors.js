/**
 * Parse the AUTHORS file into an array of `author` objects.
 *
 * @param  {String} filepath  Alternate filepath.
 * @return  {Array} array of author objects
 *     @param {Object}
 *     => {name: '', email: '', url: ''}
 */

module.exports = function (verb) {
  verb.options = verb.options || {};
  verb.context = verb.context || {};
  var utils = verb.utils;

  try {
    var filepath = verb.options.authors;
    verb.context.authors = utils.authors(filepath);
  } catch (e) {}
};