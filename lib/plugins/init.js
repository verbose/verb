'use strict';

var chalk = require('chalk');
var through = require('through2');
var utils = require('../utils');

module.exports = function init_() {
  var verb = this, id = this.gettask();

  // create a template type for vinyl files and give it a loader
  if (!verb.hasOwnProperty(id)) {
    verb.create(id, ['task']);
  }

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb/plugins/init:', 'Streaming is not supported.'));
      return cb();
    }

    // Convert vinyl file to verb template and add to collection
    verb[id](file);
    cb();
  }, function (cb) {
    var plural = verb.collection[id];
    // Convert template back to vinyl file and push into stream
    pushToStream(verb.views[plural], this);
    cb();
  });
};

function pushToStream(collection, stream, fn) {
  var i = 0;
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      var file = collection[key];
      stream.push(fn ? fn(file, i++) : file);
    }
  }
}
