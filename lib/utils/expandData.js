/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const file = require('fs-utils');
const _    = require('lodash');
const arrayify = require('./arrayify');


/**
 * Read in data from a string, object or array
 *
 * @name expandData
 * @param  {String,Object,Array} data     String, object or array
 * @param  {Object}              options  Pass an object of options
 * @return {Object}                       Returns an object of metadata
 *
 * @api {Public}
 */

module.exports = function (data, options) {
  options = options || {};
  options.data = options.data || {};
  var opts = _.extend({namespace: false}, options);
  opts.glob = opts.glob || {};

  var dataObj = {};
  if (_.isString(data) || _.isArray(data)) {
    arrayify(data).map(function (meta) {
      if (_.isString(meta)) {
        _.extend(dataObj, file.expandDataFiles(meta, opts.glob));
      } else if (_.isObject(meta)) {
        _.extend(dataObj, meta);
      }
    });
  } else {
    _.extend(dataObj, data);
  }
  return dataObj;
};