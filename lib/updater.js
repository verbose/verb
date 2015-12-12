'use strict';

var Schema = require('./schema');
var utils = require('./utils');

/**
 * Adds get/set methods to verb env
 */

module.exports = function(options) {
  return function(verb) {
    utils.define(verb, 'update', function(pkg, args) {
      if (!pkg) return;

      var schema = new Schema(pkg, options);
      // console.log(schema)
      var config = utils.mapper(schema)
        .map('set')
        .map('del');

      config.process(args);
    });
  };
};

function updater(pkg) {

}



function update(obj, prop, newVal, schema, method) {
  if (schema && schema.validate) {
    newVal = schema.validate(prop, newVal);
  }
  var val = utils.get(obj, prop);
  if (typeof val === 'undefined' || utils.isPrimitive(newVal)) {
    utils.set(obj, prop, newVal);
    return obj;
  }

  if (utils.isObject(newVal)) {
    for (var key in newVal) {
      update(val, key, newVal[key], schema[prop]);
    }
    return obj;
  }

  if (Array.isArray(newVal)) {
    var len = newVal.length;
    val = utils.arrayify(val);

    while (len--) {
      if (val.indexOf(newVal[len]) < 0) {
        val.push(newVal[len]);
      }
    }
    utils.set(obj, prop, val);
    return obj;
  }
}

// module.exports = function(options) {
//   var Schema = new Schema(options);

//   return function(verb) {
//     utils.define(verb, 'update', function(pkg, args) {
//       if (!pkg) return;

//       var config = utils.mapper(schema)
//         .map('set', function(obj) {
//           for(var key in obj) {
//             update(pkg, key, obj[key], schema, 'set');
//           }
//         })
//         .map('del', function(obj) {
//           for(var key in obj) {
//             update(pkg, key, obj[key], schema, 'del');
//           }
//         });

//       config.process(args);
//     });
//   };
// };
