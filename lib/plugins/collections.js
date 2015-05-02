'use strict';

var chalk = require('chalk');
var PluginError = require('plugin-error');
var through = require('through2');

module.exports = plugin('verb', 'collections');

function plugin(appname, name) {
  var pluginname = appname + '-' + name;

  return function collectionsPlugin() {
    var verb = this, id = this.getTask();

    return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }
      if (file.isStream()) {
        this.emit('error', new PluginError(pluginname, 'Streaming is not supported.'));
        return cb();
      }

      cb();
    }, function (cb) {
      var plural = verb.inflections[id];
      var collection = verb.views[plural];

      for (var key in collection) {
        if (collection.hasOwnProperty(key)) {
          var file = collection[key];
          verb.handle('onRender', file, handleError(file));
          this.push(file);
        }
      }
      cb();
    });
  };
}

function handleError(file) {
  return function (err) {
    if (err) {
      console.error(chalk.red('Error running `.onRender` middleware for', file.path));
      console.error(chalk.red(err));
    }
  };
}
