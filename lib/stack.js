'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var es = require('event-stream');
var _ = require('lodash');

/**
 * Default plugins
 */

var init = require('./plugins/init');
var travis = require('./plugins/travis');
var readme = require('./plugins/readme');
var render = require('./plugins/render');

/**
 * Session storage
 */

var session = require('./session');

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

  var arr = _.reduce(plugins, enabled, []);
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
  _.extend(locals, session.get('src-opts'));

  return createStack(app, {
    'dest:travis': travis.call(app, locals),
    'dest:render': render.call(app, locals),
    'dest:readme': readme.call(app, locals)
  });
};

