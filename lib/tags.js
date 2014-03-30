/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const async = require('async');
const _ = require('lodash');

/**
 * Adds tags to the context
 *
 * @name tags
 * @param {Object} options
 * @return {Object}
 * @api private
 */

var awaitingCallback = {};
var getRandom = function (seed) {
  return seed.getTime();
};

var getAsyncKey = function (key) {
  return '{{'+key+':'+getRandom(new Date())+'}}';
};

var makeAsync = function (key, fn) {
  return function () {
    var asyncKey = getAsyncKey(key);
    awaitingCallback[asyncKey] = {
      fn: fn,
      args: Array.prototype.slice.call(arguments)
    };

    return asyncKey;
  };
};

/**
 * Initialize tags
 * @param   {Object}  verb
 * @return  {Object}
 */

exports.init = function (verb) {
  var options = verb.options || {};
  options.tags = options.tags || [];

  var extendContext = verb.utils.extendContext;
  verb.extensionType = 'tag';

  var tags = {};
  var builtIns = [__dirname, 'tags/*.js'].join('/');

  /**
   * Built-in tags
   */

  _.extend(tags, extendContext(verb, builtIns));

  /**
   * User-defined
   */

  _.extend(tags, extendContext(verb, options.tags));

  _.map(_.keys(tags), function (key) {
    var tag = tags[key];
    if (_.isFunction(tag) && tag.async) {
      tags[key] = makeAsync(key, tag);
    }
  });

  verb.context = _.extend({}, verb.context, tags);
  return verb.context;
};

exports.resolve = function (verb, source, done) {
  async.eachSeries(
    _.keys(awaitingCallback),

    function (key, next) {
      var tag = awaitingCallback[key];
      tag.fn.apply(null, tag.args);
      tag.fn.async(function (err, results) {
        delete awaitingCallback[key];
        source = source.replace(key, function () { return results; });
        next();
      });
    },

    function (err) {
      if (err) {
        return done(err);
      }
      done(null, source);
    });
};