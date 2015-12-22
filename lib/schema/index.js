'use strict';

var tableize = require('tableize');
var utils = require('./utils');

function Schema(options) {
  this.options = options || {};
  this.errors = [];
  this.fields = {};

  if (this.options.fields) {
    for (var key in this.options.fields) {
      this.fields[key] = this.options.fields[key];
    }
  }
}

Schema.prototype.field = function(name, type, options) {
  return (this.fields[name] = new Field(type, options));
};

Schema.prototype.get = function(name, prop) {
  return utils.get(this.fields, name, prop);
};

Schema.prototype.isValid = function(name, val) {
  var field = this.get(name);
  if (this.options.knownOnly === true && typeof field === 'undefined') {
    return false;
  }
  if (typeof field === 'undefined') {
    return true;
  }
  return field.validate(val);
};

Schema.prototype.isOptional = function(name) {
  return this.get(name, 'optional');
};

Schema.prototype.isRequired = function(name) {
  return this.get(name, 'required');
};

Schema.prototype.error = function(method, msg) {
  this.errors.push({method: method, msg: msg});
  return this;
};

Schema.prototype.validate = function(context) {
  if (!utils.isObject(context)) {
    this.error('schema.validate', 'invalid context object');
  } else {
    var ctx = tableize(context);
    for (var key in ctx) {
      var field = ctx[key];
      var isValid = this.isValid(key, field);
      if (!isValid) {
        var types = this.get(key, 'types');
        var val = JSON.stringify(field);
        this.error(key, 'expected "' + field + '" to be ' + article(types));
      }
    }
  }
  return this.errors;
};

function Field(type, options) {
  if (utils.isObject(type)) {
    options = type;
    type = options.type || options.types;
  }
  options = options || {};
  this.types = typeof type === 'string'
    ? type.split(/\W/)
    : type;

  for (var key in options) {
    this[key] = options[key];
  }
  if (!options.hasOwnProperty('optional')) {
    this.optional = true;
  }
  if (!options.hasOwnProperty('required')) {
    this.required = false;
  }
}

Field.prototype.validate = function(val) {
  return this.types.indexOf(utils.typeOf(val)) > -1;
};

function article(types) {
  if (typeof types === 'string' || types.length === 1) {
    var prefix = /^[aeiou]/.test(String(types)) ? 'an ' : 'a ';
    return prefix + types;
  }
  return types.map(function(type) {
    return article(type);
  }).join(' or ');
}

/**
 * Expose `Schema`
 */

module.exports = Schema;


/**
 * Adds get/set methods to verb env
 */

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

