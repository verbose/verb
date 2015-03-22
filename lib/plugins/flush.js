'use strict';

var chalk = require('chalk');
var through = require('through2');

module.exports = function flush_() {
  var verb = this, id = this.gettask();

  return through.obj(function (file, enc, cb) {
    cb();
  }, function (cb) {
    var plural = verb.collection[id];
    var collection = verb.views[plural];

    var i = 0;
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

function handleError(file) {
  return function (err) {
    if (err) {
      console.error(chalk.red('Error running `.onRender` middleware for', file.path));
      console.error(chalk.red(err));
    }
  };
}
