'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var sessionify = require('sessionify');
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
var render = plugins.render;
var init = plugins.init;

/**
 * Create the default plugin stack based on user settings.
 *
 * @api private
 */

function createStack(verb, plugins) {
  var stack = es.pipe.apply(es, reduce(plugins, function(acc, plugin, name) {
    if (plugin == null) {
      acc.push(through.obj());
    }
    if (verb.enabled(name + ' plugin')) {
      acc = acc.concat(plugin);
    }
    return acc;
  }, []));
  return sessionify(stack, session);
}

/**
 * Default `src` plugins to run.
 *
 * Disable plugins by passing the name of the plugin
 * to `verb.disable()`,
 *
 * ```js
 * verb.disable('src:init plugin');
 * ```
 * @api private
 */

exports.src = function(verb, glob, locals) {
  session.set('src-opts', locals);
  return createStack(verb, {
    'src:init': init.call(verb, locals)
  });
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * verb.disable('dest:render plugin');
 * verb.disable('dest:readme plugin');
 * ```
 * @api private
 */

exports.dest = function(verb, dest, locals) {
  locals = merge({}, session.get('src-opts'), locals, {dest: dest});
  return createStack(verb, {
    'dest:render': render.call(verb, locals),
  });
};

