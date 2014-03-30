/**
 * Flatten an array and convert it
 * to a comma-separated list.
 *
 * @title listify
 * @param {Array} arr [description]
 * @api Public
 */

module.exports = function (verb) {
  exports.listify = function(arr, sep) {
    return verb.utils.listify(arr, sep);
  };
  return exports;
};

