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
    var keys = verb.get('data.keys');

    // detect helpers used in the current file
    while (match = re.exec(str)) {
      str = str.split(match[0]).join('');
      if (res.indexOf(match[1]) === -1) {
        res.push(match[1]);
      }
    }

    var conflicting = _.intersection(keys, res);
    for (var i = 0; i < conflicting.length; i++) {
      var name = conflicting[i];
      var syncFn = verb._.helpers[name];
      if (syncFn) {
        var h = {};
        h[name] = syncFn;
        verb.helpers({__: h});
        delete verb._.helpers[name];
      }

      var asyncFn = verb._.asyncHelpers[name];
      if (asyncFn) {
        var h = {};
        h[name] = asyncFn;
        verb.asyncHelpers({__: h});
        delete verb._.asyncHelpers[name];
      }
      file.content = namespace(file.content, name);
    }
    next();
  }
};


function namespace(str, name) {
  return str.split('{%= ' + name).join('{%= __.' + name);
}
