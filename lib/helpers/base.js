'use strict';

/**
 * Module dependencies
 */

var chalk = require('chalk');
var debug = require('debug')('verb:helper:base');

module.exports = function base(app, subtype, name, locals, cb) {
  if (typeof locals === 'function') {
    cb = locals;
    locals = {};
  }

  try {
    var plural = app.collection[subtype];
    var template = app.lookup(plural, name);

    if (typeof template !== 'object') {
      throw new Error(chalk.red('cannot find: {%= ' + subtype + '("' + name + '") %}'));
    }

    template.render(locals, function(err, content) {
      if (err) {
        console.log(err);
        debug(subtype + ' helper err: %j', err);
        return cb(err);
      }
      cb(null, content);
    });
  } catch (err) {
    console.log(chalk.red(err));
  }
};