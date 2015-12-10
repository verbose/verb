'use strict';

var utils = require('./utils');

var schema = {
  related: {
    type: 'object',
    list: {
      type: 'array'
    },
    // validate: function() {

    // }
  },
  reflinks: {
    type: 'array|object',
    list: {
      type: 'array'
    }
  },
  plugins: {
    type: 'array|object'
  }
};

schema.validate = function(prop, val) {
  var target = utils.get(schema, prop);
  if (typeof target === 'undefined') {
    return;
  }
  if (typeof target.validate === 'function') {
    target.validate(val);
  }

  if (!target.type) return;
  var types = target.types.split(/\W/);
  if (types.indexOf(typeOf(val)) > -1) {
    throw new TypeError('expected "' + val + '" to be ' + article(types));
  }
};

/**
 * Adds get/set methods to verb env
 */

module.exports = function(options) {
  return function(verb) {

    utils.define(verb, 'update', function(pkg) {
      return function(prop, val) {
        update(pkg, prop, val, schema);
        return pkg;
      };
    });
  };
};

function article(types) {
  if (typeof types === 'string' || types.length === 1) {
    return (/[aeiou]/.test(types[0]) ? 'an ' : 'a ') + types[0];
  }
  return types.map(function(type) {
    return article(type);
  }).join(' or ');
}

function update(obj, prop, newVal, schema) {
  if (schema) {
    schema.validate(prop, newVal);
  }

  var val = utils.get(obj, prop);
  if (typeof val === 'undefined' || utils.isPrimative(newVal)) {
    utils.set(obj, prop, newVal);
    return obj;
  }

  if (utils.isObject(newVal)) {
    utils.set(obj, prop, utils.extend({}, val, newVal));
    return obj;
  }

  if (Array.isArray(newVal)) {
    var len = newVal.length;
    while (len--) {
      if (val.indexOf(newVal[len]) < 0) {
        val.push(newVal[len]);
      }
    }
    utils.set(obj, prop, val);
    return obj;
  }
}
