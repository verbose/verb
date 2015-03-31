'use strict';

/**
 * Resolve conflicts between helpers and data
 * properties before rendering.
 */

var _ = require('lodash');
var re = /\{%= ((?!__\.)[\w.]+)\((['"][\s\S]*?['"}])?\) %}/;

module.exports = function conflict_(verb) {
  return function (file, next) {
    var match, res = [], str = file.content;
    var keys = Object.keys(verb.cache.data);
    var h = {};

    // detect helpers used in the current file
    while (match = re.exec(str)) {
      str = str.split(match[0]).join('');
      if (res.indexOf(match[1]) === -1) {
        res.push(match[1].trim());
      }
    }

    var conflicting = _.intersection(keys, res);
    var missing = res.filter(function (name) {
      return !verb._.helpers.hasOwnProperty(name) && !verb._.asyncHelpers.hasOwnProperty(name);
    });

    conflicting = conflicting.concat(missing);
    if (!conflicting.length) {
      return next();
    }

    var o = {};

    file.locals = file.locals || {};
    file.locals.__ = file.locals.__ || {};
    o.options = _.extend({}, verb.options, file.options);
    o.context = file.locals || {};
    o.app = verb;

    for (var i = 0; i < conflicting.length; i++) {
      var name = conflicting[i];
      file.content = namespace(file.content, name);
      var syncFn = verb._.helpers[name];
      if (syncFn) {
        h[name] = _.bind(syncFn, o);
        file.locals.__[name] = _.bind(syncFn, o);
        verb.helpers({__: h});
        delete verb._.helpers[name];
      }

      var asyncFn = verb._.asyncHelpers[name];
      if (asyncFn) {
        h[name] = _.bind(asyncFn, o);
        file.locals.__[name] = _.bind(asyncFn, o);
        verb.asyncHelpers({__: h});
        delete verb._.asyncHelpers[name];
      }

      if (!asyncFn && !syncFn) {
        h[name] = function noop() {};
        file.locals.__[name] = function noop() {};
        verb.helpers({__: h});
      }
    }
    next();
  };
};

function namespace(str, name) {
  return str.split('{%= ' + name).join('{%= __.' + name);
}
