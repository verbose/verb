'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var reduce = require('object.reduce');
var merge = require('merge-deep');
var es = require('event-stream');

/**
 * Session storage
 */

var session = require('session-cache')('verb');

/**
 * Default plugins
 */

var plugins = require('./plugins');
var readme = plugins.readme;
var render = plugins.render;
var init = plugins.init;

/**
 * Create the default plugin stack based on user settings.
 *
 * @api private
 */

function createStack(app, plugins) {
  function enabled(acc, plugin, name) {
    if (plugin == null) {
      acc.push(through.obj());
    }
    if (app.enabled(name + ' plugin')) {
      acc = acc.concat(plugin);
    }
    return acc;
  }
  var arr = reduce(plugins, enabled, []);
  return es.pipe.apply(es, arr);
}

/**
 * Default `src` plugins to run.
 *
 * Disable plugins by passing the name of the plugin
 * to `app.disable()`,
 *
 * ```js
 * app.disable('src:init plugin');
 * ```
 * @api private
 */

exports.src = function(app, glob, locals) {
  session.set('src-opts', locals);
  return createStack(app, {
    'src:init': init.call(app, locals)
  });
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('dest:render plugin');
 * app.disable('dest:readme plugin');
 * ```
 * @api private
 */

exports.dest = function(app, dest, locals) {
  locals = merge({}, session.get('src-opts'), locals, {dest: dest});

  return createStack(app, {
    'dest:render': render.call(app, locals),
  });
};

