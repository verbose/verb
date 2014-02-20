/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var colors = require('./colors');
var async = require('async');
var _ = require('lodash');

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
 * @param   {Object}  phaser
 * @return  {Object}
 */

exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var extendContext = phaser.utils.extendContext;

  var tags = {};
  var builtIns = path.join(__dirname, 'tags/*.js');

  /**
   * Built-in tags
   */

  _.extend(tags, extendContext(phaser, builtIns));

  /**
   * User-defined
   */

  _.extend(tags, extendContext(phaser, opts.tags));

  phaser.verbose.info(tags);
  phaser.verbose.info(_.keys(tags).length + ' tags registered.', colors.green('OK.'));

  _.map(_.keys(tags), function (key) {
    var tag = tags[key];
    if (_.isFunction(tag) && tag.async) {
      tags[key] = makeAsync(key, tag);
    }
  });

  phaser.context = _.extend({}, phaser.context, tags);
  return phaser.context;
};

exports.resolve = function (phaser, source, done) {
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