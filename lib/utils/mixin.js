'use strict';

var isObject = require('./is-object');
var _ = require('lodash');

/**
 * Mix the properties of each object into the
 * target object.
 *
 * @param  {Object} `object` The target object
 * @param  {Objects} Objects to get propeties from.
 * @return {Object}
 */

module.exports = function mixin(o) {
  var args = [].slice.call(arguments, 1);
  var len = args.length;

  if (o == null) {
    return {};
  }

  if (len === 0) {
    return o;
  }

  function copy(value, key) {
    var obj = this[key];
    if (isObject(value) && isObject(obj)) {
      mixin(obj, value);
    } else {
      this[key] = value;
    }
  }

  for (var i = 0; i < len; i++) {
    var obj = args[i];

    if (obj != null) {
      _.forIn(obj, copy, o);
    }
  }
  return o;
};