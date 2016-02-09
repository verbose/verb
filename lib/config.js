'use strict';

var path = require('path');
var typeOf = require('kind-of');
var merge = require('mixin-deep');
var config = require('./config/');
var plugins = require('./plugins');

module.exports = function(options) {
  return function(app) {
    this.use(plugins.config(this.options));

    this.config
      .map('data')
      // .map('create')
      // .map('templates')
      .map('reflinks', function(val) {
        val = Array.isArray(val) ? val : [val];
        // this.pkg.set('verb.reflinks', val);
      })
      .map('options', config.options(this))
      .map('option', 'options')
      .map('plugins', config.plugins(this))
      .map('helpers', config.helpers(this))
      .map('engines', config.engines(this))
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
  res[val] = { key: val };
  return configObject(res, key, options, schema);
}

function configObject(obj, key, options, schema) {
  var res = {};

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var val = obj[prop];

      if (typeof val === 'string') {
        val = { name: val };
      }


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
