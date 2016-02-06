'use strict';

var path = require('path');
var typeOf = require('kind-of');
var Schema = require('map-schema');
var merge = require('mixin-deep');
var utils = require('generator-util');
var inflect = require('inflection');

module.exports = function(config) {
  return function(app) {
    this.define('schema', function(options) {
      var opts = merge({app: this}, config, this.options, options);
      var schema = new Schema(opts)
        .field('options', 'object')
        .field('data', 'object')

        .field('plugins', ['array', 'object', 'string'], {
          normalize: normalize
        })
        .field('helpers', ['array', 'object', 'string'], {
          normalize: normalize
        })
        .field('asyncHelpers', ['array', 'object', 'string'], {
          normalize: normalize
        })
        .field('engines', ['array', 'object', 'string'], {
          normalize: normalize
        })
        // .field('use', ['array', 'object', 'string'], {
        //   normalize: normalize
        // })
        .field('create', 'object', {
          normalize: function(obj, key, options, schema) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                if (!app[prop]) app.create(prop, obj[prop]);
              }
            }
          }
        })
        .field('layout', ['object', 'string'])
        .field('templates', ['array', 'object'], {
          normalize: function(val, key, options, schema) {
            if (typeof val === 'string') {

            } else if (Array.isArray(val)) {


            } else if (typeof val === 'object') {
              for (var prop in val) {
                if (val.hasOwnProperty(prop)) {
                  var value = val[prop];

                  if (!app[prop]) app.create(prop);

                  if (typeof value === 'string') {
                    var obj = tryRequire(path.resolve(value));
                    if (obj) app[prop].addViews(obj);
                  }
                }
              }
            }
          }
        });
      return schema;
    });
  };
};

function normalize(val, key, options, schema) {
  var res = {};
  switch(typeOf(val)) {
    case 'array':
      res = configArray(val, key, options, schema);
      break;
    case 'object':
      res = configObject(val, key, options, schema);
      break;
    case 'string':
      res = configString(val, key, options, schema);
      break;
  }
  return res;
}

function configString(val, key, options, schema) {
  var res = {};
  var obj = { key: val };

  if (val.indexOf('./') === 0) {
    obj.path = path.resolve(val);
  }

  res[val] = obj;
  return configObject(res, key, options, schema);
}

function configObject(obj, key, options, schema) {
  var app = schema.options.app;
  var res = {};

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var val = obj[prop];

      if (key === prop && typeof val === 'string') {
        var o = tryRequire(path.resolve(val));
        if (typeof o === 'function') {
          val.fn = o;
        }

        if (o && typeof o === 'object') {
          for (var k in o) {
            var v = o[k];
            res[k] = { fn: v, name: k };
          }
          continue;
        }
      }

      if (typeof val === 'string') {
        val = { name: val };
      }

      var name = val.name || prop;
      var alias = toAlias(key, prop);
      delete val.name;

      var opts = { options: val, name: name };
      if (val.hasOwnProperty('path')) {
        opts.path = path.resolve(val.path);
        delete val.path;
      }

      var modulename = opts.path || opts.name;
      var fn = tryRequire(modulename);
      var fp;

      if (!fn) {
        fp = path.resolve(app.cwd, 'node_modules', modulename);
        fn = tryRequire(fp);
        if (fn) opts.path = fp;
      }

      if (typeof fn === 'undefined') {
        handleError(app, modulename, 'helpers');
        continue;
      }

      opts.fn = val.fn || fn;
      res[alias] = opts;
    }
  }
  return res;
}

function configArray(val, key, options, schema) {
  var len = val.length;
  var idx = -1;
  var res = {};
  while (++idx < len) {
    merge(res, normalize(val[idx], key, options, schema));
  }
  return res;
}

function toAlias(prefix, key) {
  if (key.length === 1) return key;
  var re = new RegExp('^(' + inflections(prefix) + ')(\\W+)?');
  return key.replace(re, '');
}

function inflections(key) {
  var single = inflect.singularize(key);
  var plural = inflect.pluralize(key);
  return [single, plural].join('|');
}

function handleError(app, name, prop) {
  var appname = app.constructor.name.toLowerCase() + '.' + prop;
  console.error('cannot resolve: `%s`, in package.json `%s` config', name, appname);
}


function tryRequire(name) {
  try {
    return require(name);
  } catch (err) {}

  try {
    return require(path.resolve(name));
  } catch (err) {}
}
