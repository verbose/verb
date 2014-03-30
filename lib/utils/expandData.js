/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

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
  var opts = _.extend({namespace: false}, options || {});

  opts.data = {};
  if (_.isString(data) || _.isArray(data)) {
    arrayify(data).map(function (meta) {
      if (_.isString(meta)) {
        _.extend(opts.data, file.expandDataFiles(meta, opts));
      } else if (_.isObject(meta)) {
        _.extend(opts.data, meta);
      }
    });
  } else {
    _.extend(opts.data, data);
  }
  return opts.data;
};