const path = require('path');
const plasma = require('plasma');
const _ = require('lodash');


/**
 * Plugins
 *
 * @name plugins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

module.exports = function (verb) {
  var options = verb.options || {};
  options.plugins = options.plugins || [];
  var builtIns = path.join(__dirname, 'plugins/*.js');

  _.extend(verb.context, plasma.fn(builtIns, {config: verb }));
  _.extend(verb.context, plasma.fn(options.plugins, {config: verb }));
};