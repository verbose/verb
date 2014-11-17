'use strict';

var path = require('path');
var debug = require('debug')('template:create:base');
var mapFiles = require('map-files');

/**
 * Base function for creating a template subtype with a
 * built-in loader.
 *
 * @param  {Object} `app` Instance of Template, or inheriting application.
 * @param  {Object} `options` Options to use with all template subtypes.
 * @return {Function} Returns the function for creating template subtypes.
 */

module.exports = function createBase(app, options) {

  /**
   * Create a new template subtype with the specified `name`,
   * and use the given `cwd` as the base directory for
   * loading templates for this subtype.
   *
   * @param  {String} `name` The name of the subtype, e.g. `include`
   * @param  {String} `cwd` The base path for loading templates.
   * @return {Object} Returns an object of templates.
   */

  return function base(name, cwd) {
    debug('creating subtype: ', name);

    cwd = cwd || path.join(process.cwd(), 'templates');

    app.create(name, options, [
      function (patterns, next) {
        var fp = path.join(cwd, patterns);
        debug('subtype ' + name + ' loading: ', fp);
        next(null, mapFiles(fp, options));
      }
    ],

    // handle errors
    function (err) {
      if (err) console.log('[createBase]: ', err);
      debug('[createBase] ' + name + 'error: ', err);
    });
  };
};