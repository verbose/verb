/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var frep = require('frep');
var file = require('fs-utils');
var _    = require('lodash');

// Local libs
var patterns = require('./patterns');


// Export the `utils` object
var utils = module.exports = {};


utils.arrayify = function(arr) {
  return !Array.isArray(arr) ? [arr] : arr;
};

utils.extractUsername = function(str) {
  return str.replace(/^([^:]+):\/\/(?:.+)\/(.+)\/(?:.+)/, '$2');
};

// Generate a Table of Contents. Use {%= toc %} in templates
utils.toc = function(src) {
  return require('marked-toc')(src);
};

// Date functions used in _.date() filter
utils.formatDate = function(dateobj, pattern) {
  /* jshint unused: false */
  var fallback = 'YYYY-MMM-DD DDD';
  var year = dateobj.getFullYear();
  var month = ('0' + (dateobj.getMonth() + 1)).slice(-2);
  var date = ('0' + dateobj.getDate()).slice(-2);
  var hours = ('0' + dateobj.getHours()).slice(-2);
  var minutes = ('0' + dateobj.getMinutes()).slice(-2);
  var seconds = ('0' + dateobj.getSeconds()).slice(-2);
  var day = dateobj.getDay();
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dates = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'];
  var output = '';

  pattern = pattern || fallback;
  switch (pattern) {
  case 'YYYY-MM-DD':
    output = year + '-' + month + '-' + date;
    break;
  case 'YYYY':
    output = year;
    break;
  case 'full':
    output = dates[parseInt(day)] + ', ' + months[parseInt(month) - 1] + ' ' + date + ', ' + year;
    break;
  }
  return output;
};


/**
 * Reads in data from a string, object or array
 * @param  {String|Object|Array} optsData Supply a string, object or array
 * @param  {Object}              options  Pass an object of options
 * @return {Object}                       Returns an object of metadata
 */
utils.readOptionsData = function (optsData, options) {
  options = options || {};

  var metadata = {};
  if (_.isString(optsData) || _.isArray(optsData)) {
    optsData = _.flatten(Array.isArray(optsData) ? optsData : [optsData]);
    optsData.map(function (meta) {
      if (_.isString(meta)) {
        return _.extend(metadata, file.expandDataFiles(meta, options));
      } else if (_.isObject(meta)) {
        return _.extend(metadata, meta);
      }
    });
  } else {
    metadata = _.extend(metadata, optsData);
  }
  return metadata;
};

// Post-process content with RegExp replacement patterns
utils.postProcess = function (str, opts) {
  opts = opts || {};
  var replacements = _.union(patterns.escapeTemplates, opts.replacements);
  return frep.strWithArr(str, replacements);
};