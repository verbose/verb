'use strict';

var through = require('through2');
var utils = require('../utils');
var _ = require('lodash');
var re = /\{%= ((?!__\.)[\w.]+)\((['"][\s\S]*?['"}])?\) %}/;

module.exports = function() {
  var noop = function noop() {};
  var verb = this;

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb plugin', 'Streaming is not supported.'));
      return cb();
    }

    var str = file.contents.toString();
    var match, res = [];
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
      this.push(file);
      return cb();
    }

    var o = {};
    o.options = _.extend({}, verb.options, file.options);
    o.context = file.locals || {};
    o.app = verb;

    file.locals = file.locals || {};
    file.locals.__ = file.locals.__ || {};

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
        h[name] = noop;
        file.locals.__[name] = noop;
        verb.helpers({__: h});
      }
    }

    file.contents = new Buffer(file.content);
    this.push(file);
    cb();
  });
};

function namespace(str, name) {
  return str.split('{%= ' + name).join('{%= __.' + name);
}
