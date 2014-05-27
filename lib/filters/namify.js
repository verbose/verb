/**
 * ## .namify( str )
 *
 * Convert a npm package name into a safe-to-use variable name.
 *
 * @method namify
 * @param {String} The string to namify
 * @api public
 */

const namify = require('namify');


module.exports = function (verb) {
  exports.namify = function(str) {
    return namify(str);
  };
  return exports;
};

