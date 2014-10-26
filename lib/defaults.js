'use strict';

/**
 * Module dependencies.
 */

var es = require('event-stream');
var through = require('through2');
var init = require('./plugins/init');
var destPath = require('./plugins/dest');
var render = require('./plugins/render');
var routes = require('./plugins/routes');

/**
 * Create the default plugin stack based on user settings.
 *
 * Disable a plugin by passing the name of the plugin
 * to `verb.disable()`,
 *
 * **Example:**
 *
 * ```js
 * verb.disable('src:routes');
 * verb.disable('src:extend');
 * ```
 *
 * @api private
 */

function createStack(verb, plugins) {
  // if (verb.enabled('minimal') || plugins.length === 0) {
  //   return es.pipe.apply(es, []);
  // }

  var pipeline = [];

  Object.keys(plugins).forEach(function(name) {
    if (verb.enabled(name)) {
    }
    pipeline = pipeline.concat(plugins[name]);
  });

  if (!pipeline.length) {
    pipeline.push(through.obj());
  }

  return es.pipe.apply(es, pipeline);
}

/**
 * Default `src` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * verb.disable('drafts plugin');
 * ```
 *
 * @api private
 */

exports.src = function(verb, glob, locals) {
  return createStack(verb, {
    'src:init': init.call(verb, locals),
    // 'src:routes': routes.call(verb, locals),
    // 'src:extend': extend.call(verb, locals)
  });
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * verb.disable('dest:routes');
 * ```
 * @api private
 */

exports.dest = function(verb, dest, locals) {
  return createStack(verb, {
    // 'dest:extend': extend.call(verb, locals),
    // 'dest:path': destPath.call(verb, dest, locals),
    // 'dest:routes': routes.call(verb, locals),
    'dest:render': render.call(verb, locals)
  });
};

