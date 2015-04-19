'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var sessionify = require('sessionify');
var drafts = require('gulp-drafts');
var es = require('event-stream');
var vfs = require('vinyl-fs');
var _ = require('lodash');

/**
 * Local dependencies
 */

var plugins = require('./plugins');
var session = require('./session');

/**
 * Create the default plugin stack based on user settings.
 *
 * Disable a plugin by passing the name of the plugin + ` plugin`
 * to `app.disable()`,
 *
 * **Example:**
 *
 * ```js
 * app.disable('src:render plugin');
 * app.disable('src:drafts plugin');
 * ```
 */

function createStack(verb, plugins) {
  if (verb.enabled('minimal config')) {
    return es.pipe.apply(es, []);
  }

  function enabled(acc, plugin, name) {
    if (plugin == null) {
      acc.push(through.obj());
    }
    if (verb.enabled(name + ' plugin')) {
      acc = acc.concat(plugin);
    }
    return acc;
  }
  var arr = _.reduce(plugins, enabled, []);
  var res = es.pipe.apply(es, arr);
  return sessionify(res, session, verb);
}

/**
 * Default `src` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * verb.disable('src:drafts plugin');
 * ```
 */

exports.src = function (verb, glob, options) {
  var opts = _.extend({}, verb.options, options);
  session.set('src-opts', opts);

  return createStack(verb, {
    'src:vfs': vfs.src(glob, opts),
    'src:init': plugins.init.call(verb, opts),
    'src:conflicts': plugins.conflicts.call(verb, opts),
    'src:drafts': drafts.call(verb, opts)
  });
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * verb.disable('dest:render plugin');
 * ```
 */

exports.dest = function (verb, dest, options) {
  var srcOpts = session.get('src-opts') || {};
  var opts = _.extend({}, verb.options, srcOpts, options);

  return createStack(verb, {
    'dest:paths': plugins.dest.call(verb, dest, opts, opts.locals),
    'dest:render': plugins.render.call(verb, opts, opts.locals),
    'dest:reflinks': plugins.reflinks.call(verb, opts, opts.locals),
    'dest:vfs': vfs.dest(dest, opts)
  });
};
