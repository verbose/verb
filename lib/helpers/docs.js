'use strict';

var debug = require('debug')('verb:helper:docs');
var helperBase = require('./base');

/**
 * Used for including files from the `docs/` directory
 * of a project.
 *
 * ```js
 * {%%= docs('foo') %}
 *
 * // change the directory
 * ```
 *
 * @param  {String} `name`
 * @param  {Object} `locals`
 * @param  {Function} `cb`
 * @return {String}
 */

module.exports = function docs(verb) {
  verb.docs('docs/**/*.md');

  return function(filename, locals, cb) {
    debug('docs helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals; locals = {};
    }
    return helperBase(verb, 'doc', filename, locals, cb);
  };
};
