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

module.exports = function(verb) {
  var opts = verb.options || {};
  var data = {};

  // Load package.json unless an explicit data object is passed in,
  // or if options.config is defined as "false"
  if((opts.config && (Object.keys(opts.config).length > 0 || opts.config === false))) {
    data = opts.config;
  } else {
    try {
      data = plasma(verb.cwd('package.json'));
    } catch (e) {
      e.origin = __filename;
      throw new Error('No config object or "package.json" was found', e);
    }
  }

  return data;
};