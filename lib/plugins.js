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

  _.extend(verb.context, plasma.load(builtIns, {
    config: verb
  }).modules.resolved);

  _.extend(verb.context, plasma.load(options.plugins, {
    config: verb
  }).modules.resolved);
};