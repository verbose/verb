'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var chalk = require('chalk');
var _ = require('lodash');

module.exports = function base_(template) {
  return function (name) {
    return function (key, locals, next) {
      var last = arguments[arguments.length - 1];
      if (typeof locals === 'function') {
        next = locals; locals = {};
      }

      if (typeof next !== 'function') {
        next = last;
      }

      var collection = template.collection[name];

      // if a `cwd` is define in a helper, load the template(s)
      // or glob patterns defined by the helper
      if (locals && locals.cwd) {
        // define as an array so it's definitely globbed
        template[collection]([path.join(locals.cwd, key + '{,.md}')]);
      }

      var file = template.lookup(collection, key);
      var dot;

      if (!file && (dot = key.indexOf('.')) !== -1) {
        file = template.lookup(collection, key.slice(0, dot));
      }

      var locs = _.merge({}, this.context, locals);

      file.render(locs, function render(err, content) {
        if (err) {
          error(name, err);
          return next(err);
        }
        next(null, content);
      });
    };
  };
};

function error (name, err) {
  var msg = chalk.red('<%= ' + name + ' %> error: %j', err);
  return console.error(msg);
}
