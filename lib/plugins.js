/**
 * Run plugins.
 *
 * @param {Function} verb
 * @api private
 */

exports.init = function (verb) {
  var options = verb.options || {};
  options.plugins = options.plugins || [];
  verb.extensionType = 'plugin';

  var run = verb.utils.extendContext;
  var builtIns = [__dirname, 'plugins/*.js'].join('/');

  /**
   * Run built-in plugins
   */

  run(verb, builtIns);

  /**
   * Run user-defined
   */

  run(verb, options.plugins);
};