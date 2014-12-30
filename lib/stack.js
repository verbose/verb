'use strict';

/**
 * Module dependencies.
 */

var reduce = require('object.reduce');
var extend = require('extend-shallow');
var sessionify = require('sessionify');
var through = require('through2');
var es = require('event-stream');
var _ = require('lodash');

/**
 * Default plugins
 */

var session = require('./session');
var plugins = require('./plugins');
var readme = plugins.readme;
var render = require('template-render');
var init = plugins.init;

/**
 * Create the default plugin stack based on user settings.
 *
 * @api private
 */

function createStack(verb, plugins) {
  function enabled(acc, value, key) {
    if (value == null) {
      acc.push(through.obj());
    }
    if (verb.enabled(key + ' plugin')) {
      acc = acc.concat(value);
    }
    return acc;
  }

  var arr = reduce(plugins, enabled, []);
  var res = es.pipe.apply(es, arr);
  return sessionify(res, session);
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
  locals = extend({}, session.get('src-opts'), locals, {dest: dest});
  var config = {prefix: 'task_', name: 'task_name'};

  return createStack(verb, {
    'dest:render': render(verb, config)(locals),
    'dest:readme': readme.call(verb, locals)
  });
};

