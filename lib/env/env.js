'use strict';

var path = require('path');
var merge = require('lodash')._.merge;

/**
 * Getter for getting stored values from `verb.env`, a read-only
 * object that stores the project's package.json before it's modified.
 *
 * ```js
 * console.log(verb.env.name);
 * //=> 'my-project'
 * ```
 *
 * @return {*} The value of specified property.
 * @api public
 */

module.exports = function env_(verb) {
  var env = verb.env || verb.option('env') || require(path.resolve('package.json'));
  merge(env, (env.verb && env.verb.data) || {});

  Object.defineProperty(verb, 'env', {
    get: function () {
      return env;
    },
    set: function () {
      console.log('verb.env is read-only and cannot be modified.');
    }
  });
};
