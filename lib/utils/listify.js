/**
 * Flatten an array and convert it
 * to a comma-separated list.
 *
 * @title listify
 * @param {Array} arr [description]
 * @api Public
 */

module.exports = function (arr, sep) {
  sep = sep || ', ';

  do {
    arr = [].concat.apply([], arr);
  } while(arr.some(Array.isArray));
  return arr.join(sep);
};