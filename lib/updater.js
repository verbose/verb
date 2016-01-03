'use strict';

var utils = require('./utils');

module.exports = function(options) {
  options = options || {};
  return function(verb) {
    verb.define('update', update, options.schema);
  };
};

function update(config, obj, schema) {
  var table = utils.tableize(obj);
  for (var key in table) {
    if (schema && schema.has(key)) {
      updateProperty(config, key, table[key]);
    } else {
      updateProperty(config, key, table[key]);
    }
  }
  return config;
}

function updateProperty(config, prop, val) {
  config = config || {};

  if (typeof prop === 'undefined') {
    return config;
  }

  if (typeof val === 'undefined') {
    return config;
  }

  if (prop === 'del') {
    utils.del(config, val);
    return config;
  }

  // If defined in `cast`, the value will be
  // cast to a specified type
  var obj = cast(prop, val);
  prop = obj.prop;
  val = obj.val;

  var current = utils.get(config, prop);
  if (typeof current === 'undefined') {
    utils.set(config, prop, val);
    return config;
  }

  // replace existing primitive with whatever `val` is
  if (utils.isPrimitive(current)) {
    utils.set(config, prop, val);
    return config;
  }

  if (utils.isObject(val) && !Array.isArray(current)) {
    val = utils.merge({}, current, val);
    utils.set(config, prop, val);
    return config;
  }

  // if either is an array, we'll assume it should be an array
  if (Array.isArray(val) || Array.isArray(current)) {
    current = utils.arrayify(current);
    val = utils.arrayify(val);
    var len = val.length;

    while (len--) {
      if (current.indexOf(val[len]) < 0) {
        current.push(val[len]);
      }
    }

    current.sort();
    utils.set(config, prop, current);
    return config;
  }
}

function cast(key, val) {
  if (val === true) {
    if (/^(plugins|helpers)\./.test(key)) {
      var segs = key.split('.');
      key = segs[0];
      val = [segs[1]];
    }
  }

  if (typeof val === 'string') {
    if (/helpers|plugins|reflinks|related/.test(key)) {
      val = [val];
    }
  }

  return {
    prop: key,
    val: val
  };
}
