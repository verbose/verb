/**
 * Initialize user-config object. Unless overridden by passing
 * an object to `options.config`, this defaults to the
 * package.json of the user's current, local project,
 *
 * @param {Object} data
 * @return {Object}
 *
 * @api private
 */
const plasma = require('plasma');

module.exports = function(config) {
  var data = {};
  try {
    data = plasma.load('package.json').data;

    // Load package.json unless an explicit data object is passed in,
    // or if options.config is defined as "false"
    if((config && (Object.keys(config).length > 0 || config === false))) {
      data = config;
    }
  } catch (e) {
    e.origin = __filename;
    throw new Error('No config object or "package.json" was found', e);
  }
  return data;
};