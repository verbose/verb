'use strict';

var utils = require('./utils');

module.exports = function(options) {
  return function(verb) {
    verb.define('update', function(config, obj) {
      var table = utils.tableize(obj);

      for (var key in table) {
        updateProperty(config, key, table[key]);
      }
      return config;
    });

    // utils.define(verb, 'update', function(pkg, args) {
    //   if (!pkg) return;

    //   var config = utils.mapper(schema)
    //     .map('set', function(val) {
    //       update(pkg, 'set', val);
    //     })
    //     .map('del', function(val) {
    //       update(pkg, 'del', val);
    //     })
    //     .map('data', function(val) {
    //       update(pkg, 'data', val);
    //     });

    //   config.process(args);
    // });
  };
};

function updateProperty(config, prop, val) {
  config = config || {};

  if (typeof prop === 'undefined') {
    return config;
  }

  if (typeof val === 'undefined') {
    return config;
  }

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

/**
 * Adds get/set methods to verb env
 */

// module.exports = function(options) {
//   return function(verb) {
//     utils.define(verb, 'update', function(pkg, args) {
//       update()
//       // if (!pkg) return;

//       // var schema = new Schema(pkg, options);
//       // // console.log(schema)
//       // var config = utils.mapper(schema)
//       //   .map('set')
//       //   .map('del');

//       // config.process(args);
//     });
//   };
// };

// function updater(pkg) {

// }
