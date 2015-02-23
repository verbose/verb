'use strict';

/**
 * Module dependencies
 */

var include = require('./include');

module.exports = function contrib() {
  return include.apply(include, arguments);
};
