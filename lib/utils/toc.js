const toc = require('marked-toc');

/**
 * Generate a Table of Contents.
 *
 * @param  {String} str
 * @param  {Object} options
 *
 * @return {String} the Table of Contents
 * @api public
 */

module.exports = function(str, options) {
  options = options || {};
  return toc(str, options).toc || {};
};