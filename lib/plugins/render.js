'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var debug = require('debug')('verb:plugin');
var through = require('through2');
var extend = require('lodash')._.extend;
var utils = require('../utils');

module.exports = function render_(locals) {
  var verb = this, id = this.gettask();
  locals = locals || {};
  locals.options = locals.options || {};
  return through.obj(function (file, enc, cb) {
    debug('render plugin: %s', file.path);
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb-render plugin', 'Streaming is not supported.'));
      return cb();
    }
    try {

    var ext = path.extname(file.path);
    debug('render ext: %s', ext);

    if (norender(verb, ext, file, locals)) {
      this.push(file);
      return cb();
    }

    var collection = verb.collection[id];
    debug('render collection: %s', collection);

    var o = verb.views[collection][file.id], template = {};
    var ignore = ['_contents', 'stat'];
    for (var key in o) {
      if (o.hasOwnProperty(key) && ignore.indexOf(key) === -1) {
        if (key === 'contents') {
          template.content = o[key].toString();
        } else {
          template[key] = o[key];
        }
      }
    }

    extend(locals.options, verb.options);
    if (!locals.hasOwnProperty(ext)) {
      locals.ext = ext;
    }

    debug('render locals: %j', locals);
      var stream = this;

      verb.render(template, locals, function(err, content) {
        if (err) {
          debug('render error: %s', err);
          stream.emit('error', new utils.PluginError('verb/plugins/render', err));
          cb(err);
          return;
        }
        file.contents = new Buffer(content);
        stream.push(file);
        return cb();
      });

    } catch (e) {
      console.log(e);
      debug('render catch: %s', e);
      // this.emit('error', new utils.PluginError('verb/plugins/render', e));
      return cb();
    }
  });
};

/**
 * Push the `file` through if the user has specfied
 * not to render it.
 */

function norender(verb, ext, file, locals) {
  return !verb.engines.hasOwnProperty(ext)
    || verb.enabled('norender')
    || file.norender === true
    || file.render === false
    || locals.norender === true
    || locals.render === false;
}
