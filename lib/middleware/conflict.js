'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var extend = require('extend-shallow');
var symbol = require('log-symbols');

/**
 * Resolve conflicts between helpers and data
 * properties before rendering.
 */

module.exports = function conflict_(app) {
  var config = extend({}, app.options, app.get('argv'));

  if (config.verbose) {
    console.log();
    console.log(chalk.bold.underline('Checking for conflicts…'));
    console.log();
  }

  return function (file, next) {
    if (config.nolint === true) {
      return next();
    }

    var str = file.content;
    var res = helpers(str);
    var conflicting = problematic(app, file, res, config.verbose);
    var h = {};

    if (!conflicting.length) {
      return next();
    }

    var ctx = {};
    ctx.options = _.extend({}, app.options, file.options);
    ctx.context = _.merge({}, app.cache.data, file.data, file.locals);
    ctx.app = app;

    file.locals = file.locals || {};
    file.locals.__ = file.locals.__ || {};

    // console.log('actual:', app._.helpers.sync)
    for (var i = 0; i < conflicting.length; i++) {
      var name = conflicting[i];
      file.content = namespace(file.content, name);

      var syncFn = function () {
        return app._.helpers.sync[name].apply(this, arguments);
      };

      if (syncFn) {
        h[name] = _.bind(syncFn, ctx);
        file.locals.__[name] = _.bind(syncFn, ctx);
        app.helpers({__: h});
        delete app._.helpers.sync[name];
      }

      var asyncFn = app._.helpers.async[name];
      if (asyncFn) {
        h[name] = _.bind(asyncFn, ctx);
        file.locals.__[name] = _.bind(asyncFn, ctx);
        app.asyncHelpers({__: h});
        delete app._.helpers.async[name];
      }

      if (!asyncFn && !syncFn) {
        h[name] = noop(name);
        file.locals.__[name] = noop(name);
        app.helpers({__: h});
      }
    }

    next();
  };
};

function noop(name) {
  return function () {
    var msg = '';
    msg += 'ERROR! Cannot find the {%= ' + name + '() %} helper. Helpers may be ';
    msg += 'registered using `app.helper()`.';
    // console.log(chalk.red(msg));
  };
}

function namespace(str, name) {
  return str.split('{%= ' + name).join('{%= __.' + name);
}

function helpers(str) {
  var re = /\{%=\s*((?!__\.)[\w.]+)(?:\(\)|\(([^)]*?)\))\s*%}/gm;
  var res = [], match;

  while (match = re.exec(str)) {
    if (res.indexOf(match[1]) === -1) {
      res.push(match[1].trim());
    }
  }
  return res;
}

function problematic(app, file, helpers, verbose) {
  var dataKeys = Object.keys(app.cache.data);
  dataKeys = _.union(dataKeys, Object.keys(file.data));

  var registered = Object.keys(app._.helpers.async);
  registered = _.union(registered, Object.keys(app._.helpers.sync));

  var h = [], d = [];
  var len = helpers.length;

  while (len--) {
    var helper = helpers[len];
    // if the helper name is also a data prop, it's a conflict
    if (dataKeys.indexOf(helper) !== -1 && helper.indexOf('.') === -1) {
      d.push(helper);
    }

    // if the helper is not registered, it's a conflict
    if (registered.indexOf(helper) === -1 && helper.indexOf('.') === -1) {
      h.push(helper);
    }
  }

  message(h, d, verbose, file);
  return _.union(h, d);
}


function message(h, d, verbose, file) {
  if (!verbose) return;
  var fp = file.path.split(/[\\\/]/).slice(-2).join('/');

  var hlen = h.length;
  var dlen = d.length;

  if (hlen > 0) {
    console.log(symbol.error, '', chalk.red(hlen + ' missing helper' + s(hlen) + ' found in', fp));
    h.forEach(function (ele) {
      console.log('   -', ele);
    });
    console.log();
  }

  if (dlen > 0) {
    console.log(symbol.warning, '', chalk.yellow(dlen + ' data/helper conflict' + s(dlen) + ' found in', fp));
    d.forEach(function (ele) {
      console.log('   -', ele);
    });
    console.log();
  }
}

function s(len) {
  return len > 1 ? 's' : '';
}
