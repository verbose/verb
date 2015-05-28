'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var drafts = require('gulp-drafts');
var es = require('event-stream');
var vfs = require('vinyl-fs');
var _ = require('lodash');
var cache = {};

/**
 * Local dependencies
 */

var plugins = require('./plugins');

/**
 * Default `src` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('src:foo plugin');
 * ```
 */

exports.src = function(app, glob, opts) {
  opts = _.merge({}, app.options, opts);
  cache = opts;

  return createStack(app, {
    'src:vfs': vfs.src(glob, opts),
    'src:init': plugins.init.call(app, opts),
    'src:lint': plugins.lint.call(app, opts),
    'src:conflicts': plugins.conflicts.call(app, opts),
    'src:drafts': drafts.call(app, opts)
  });
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('dest:bar plugin');
 * ```
 */

exports.dest = function (app, dest, opts) {
  opts = _.merge({}, app.options, cache, opts);
  opts.locals = opts.locals || {};

  return createStack(app, {
    'dest:paths': plugins.dest.call(app, dest, opts.locals, opts),
    'dest:render': plugins.render.call(app, opts.locals, opts),
    'dest:reflinks': plugins.reflinks.call(app, opts.locals, opts),
    'dest:comments': plugins.comments.call(app),
    'dest:format': plugins.format.call(app, opts.locals, opts),
    'dest:vfs': vfs.dest(dest, opts)
  });
};

/**
 * Create the default plugin stack based on user settings.
 *
 * Disable a plugin by passing the name of the plugin + ` plugin`
 * to `app.disable()`,
 *
 * **Example:**
 *
 * ```js
 * app.disable('src:foo plugin');
 * app.disable('src:bar plugin');
 * ```
 */

function createStack(app, plugins) {
  if (app.enabled('minimal config')) {
    return es.pipe.apply(es, []);
  }
  function enabled(acc, plugin, name) {
    if (plugin == null) {
      acc.push(through.obj());
    }
    if (app.enabled(name + ' plugin')) {
      acc.push(plugin);
    }
    return acc;
  }
  var arr = _.reduce(plugins, enabled, []);
  return es.pipe.apply(es, arr);
}
