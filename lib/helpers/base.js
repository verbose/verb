'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var chalk = require('chalk');
var deprecated = require('./deprecated');

module.exports = function base(verb, subtype) {
  return function (name, locals, cb) {
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }

    if (subtype === 'contrib') {
      deprecated.contrib();
    }

    try {
      var collection = verb.collection[subtype];

      // if a `cwd` is define in a helper, load the template(s)
      // or glob patterns defined by the helper
      if (locals && locals.cwd) {
        verb[collection](path.join(locals.cwd, name));
      }

      // get the template from the verb `views` cache
      var template = verb.lookup(collection, name);

      if (typeof template !== 'object') {
        throw new TypeError(chalk.red('cannot find: {%= ' + subtype + '("' + name + '") %}'));
      }

      // render the template
      template.render(locals, function render(err, content) {
        if (err) {
          console.log(chalk.red('helper-base error: %j', err));
          return cb(err);
        }
        cb(null, content);
      });

    } catch (err) {
      console.log(chalk.red('helper-base: %j', err));
      cb(err);
      return;
    }
  };
};
