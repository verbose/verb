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

var rte = require('./plugins/rte');
var init = require('./plugins/init');
var readme = require('./plugins/readme');
var render = require('./plugins/render');
var routes = require('./plugins/routes');

/**
 * Session storage
 */

var session = require('./session');

/**
 * Create the default plugin stack based on user settings.
 *
 * @api private
 */

function createStack(verb, plugins) {
  var arr = _.reduce(plugins, function (acc, plugin) {
    if (plugin == null) {
      acc.push(through.obj());
    }
    return acc.concat(plugin);
  }, []);
  return es.pipe.apply(es, arr);
}

/**
 * Default `src` plugins to run.
 *
 * Disable plugins by passing the name of the plugin
 * to `verb.disable()`,
 *
 * ```js
 * verb.disable('src:routes');
 * verb.disable('src:extend');
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
 * verb.disable('dest:routes');
 * ```
 * @api private
 */

exports.dest = function(verb, dest, locals) {
  _.extend(locals, session.get('src-opts'));

  return createStack(verb, {
    'dest:render': render.call(verb, locals),
    'dest:readme': readme.call(verb, locals)
  });
};

