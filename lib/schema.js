'use strict';

var tableize = require('tableize');
var utils = require('./utils');

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

var schema = new Schema();

schema.field('data', ['object']);
schema.field('options', ['object']);
schema.field('plugins', ['array', 'object']);
schema.field('reflinks', ['array', 'object']);
schema.field('reflinks.list', ['array']);
schema.field('related', ['array', 'object']);
schema.field('reflinks.list', ['array'], {
  validate: function(val) {
    return Array.isArray(val);
  }
});

console.log(schema.isValid('reflinks.list', ''))
console.log(schema.isValid('whatever'))

var pkg = {
  verb: {
    reflinks: 'foo',
    related: {
      list: ['foo', 'bar', 'baz']
    },
  }
};

var results = schema.validate(pkg.verb);
// console.log(results)

function article(types) {
  if (typeof types === 'string' || types.length === 1) {
    return (/^[aeiou]/.test(types) ? 'an ' : 'a ') + types;
  }
  return types.map(function(type) {
    return article(type);
  }).join(' or ');
}

/**
 * Expose `Schema`
 */

module.exports = Schema;

Schema.prototype.validate = function(prop, val) {
  var target = utils.get(schema, prop);
  if (typeof target === 'undefined') {
    return val;
  }
  if (typeof target.fn === 'function') {
    val = target.fn(val, target);
  }
  if (typeof target.validate === 'function') {
    target.validate(val);
  }

  if (!target.type) return val;
  var types = target.type.split(/\W/);
  if (types.indexOf(utils.typeOf(val)) > -1) {
    val = JSON.stringify(val);
    throw new TypeError(prop + ' expects "' + val + '" to be ' + article(types));
  }
  return val;
};

