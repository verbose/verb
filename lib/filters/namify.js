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


module.exports = function () {
  exports.namify = function(str) {
    return namify(str);
  };
  // expose `varname` as an alias
  exports.varname = exports.namify;
  return exports;
};

