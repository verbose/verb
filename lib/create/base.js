'use strict';

var path = require('path');
var debug = require('debug')('template:create:base');
var mapFiles = require('map-files');

/**
 * Function for creating a template collection that gets
 * templates from node_modules using a custom loader.
 *
 * @param  {Object} `verb` Instance of Template, or inheriting application.
 * @param  {Object} `options` Options to use with all template subtypes.
 * @return {Function} Returns the function for creating template subtypes.
 */

module.exports = function createBase(verb, options) {
  options = options || {};

  /**
   * Create a new view collection with the specified `name`,
   * and use the given `cwd` as the base directory for
   * loading templates for this collection.
   *
   * @param  {String} `name` The name of the collection, e.g. `include`
   * @param  {String} `cwd` The base path for loading templates.
   * @return {Object} Returns an object of templates.
   */

  return function base(name, cwd) {
    if (typeof name !== 'string') {
      throw new Error('verb/create/base requires a string.');
    }

    debug('creating view collection: ', name);
    cwd = options.cwd || cwd || path.join(process.cwd(), 'templates');

    verb.create(name, options, function (patterns) {
      var fp = path.join((options && options.cwd) || cwd, patterns);
      debug('collection ' + name + ' loading: ', fp);
      return mapFiles(fp, options);
    });
  };
};
