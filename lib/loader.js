'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

module.exports = function loader(prop, app, fn) {
  if (typeof prop !== 'string') {
    throw new TypeError('expected the first argument to be a string');
  }

  return function(config) {
    var obj = app.get('env.argv.' + prop);
    var cwd = app.get('env.user.cwd');
    var opts = {};
    var fp;

    if (typeof config === 'string') {
      config = [config];

    } else if (Array.isArray(config)) {
      config = config.reduce(function(acc, val) {
        if (typeof val === 'string') {
          acc[val] = {};
        } else {
          throw new TypeError('type not supported, implement me!');
        }
        return acc;
      }, {});
    }

    for (var key in config) {
      var name = path.basename(key, path.extname(key));
      var val = config[key];

      try {
        if (name === 'index') {
          var dir = path.resolve(cwd);
          fp = utils.tryResolve(dir);
          if (fs.existsSync(fp)) {
            opts = val;
            val = utils.tryRequire(fp);
            name = path.basename(dir);
          }
        }
      } catch (err) {
        throw err;
      }

      if (typeof val === 'string') {
        throw new TypeError('type not supported. implement me!');
      }

      if (utils.isObject(val)) {
        opts = val;
        name = opts.name || name;
        var filepath = opts.path || key || name;
        val = utils.loadModule(filepath, cwd);
        if (val === null) {
          fp = path.resolve(cwd, filepath);
          throw new Error('cannot resolve ' + prop + ' at path: ' + fp);
        }
      }

      opts = opts || {};
      if (typeof name !== 'string') {
        throw new TypeError('expected ' + name + ' to be a string');
      }
      if (typeof val !== 'function') {
        var msg = 'expected ' + val
          + ' to be a function. Cannot load '
          + prop + ' ' + JSON.stringify(arguments);
        throw new Error(msg);
      }

      name = name.replace(/^[-\W]*(verb|helper|middleware|plugin)*[-\W]*/, '');
      fn(name, opts, val);
    }
  };
};
