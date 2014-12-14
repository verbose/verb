'use strict';

/**
 * Module dependencies
 */

var chalk = require('chalk');

module.exports = function base(app, subtype, name, locals, cb) {
  if (typeof locals === 'function') {
    cb = locals;
    locals = {};
  }

  try {
    var collection = app.collection[subtype];
    var template = app.lookup(collection, name);

    if (typeof template !== 'object') {
      throw new Error(chalk.red('cannot find: {%= '+subtype+'("'+name+'") %}'));
    }

    template.render(locals, function(err, content) {
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
