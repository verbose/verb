var file = require('fs-utils');
var _    = require('lodash');
var arrayify = require('./arrayify');

/**
 * Reads in data from a string, object or array
 * @param  {String|Object|Array} data Supply a string, object or array
 * @param  {Object}              options  Pass an object of options
 * @return {Object}                       Returns an object of metadata
 */
var expandData = module.exports = function (data, options) {
  var opts = _.extend({data: {}}, {file: {namespace: true}}, options);
  var obj = {};
  if (_.isString(data) || _.isArray(data)) {
    arrayify(data).map(function (meta) {
      var name = file.base(meta);
      if (_.isString(meta)) {
        opts.data = _.extend(opts.data, file.expandDataFiles(meta, opts.file));
      } else if (_.isObject(meta)) {
        opts.data = _.extend(opts.data, meta);
      }
    });
  } else {
    opts.data = _.extend(opts.data, data);
  }
  file.writeDataSync('opts-data.json', opts);
  console.log(opts);
  return opts.data;
};