/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

// http://stackoverflow.com/questions/17251764/lodash-filter-collection-using-array-of-values
var filterByValues = module.exports = function(collection, property, values) {
  return _.filter(collection, function(item) {
    return _.contains(values, item[property]);
  });
};