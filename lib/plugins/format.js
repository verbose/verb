'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var reflinks = require('helper-reflinks');
var utils = require('../utils');

/**
 * Append reflinks to `file.contents`
 */

module.exports = function reflinks_() {
  var verb = this;
  var argv = verb.get('argv');

  return through.obj(function (file, enc, cb) {
    if (argv.noformat || verb.enabled('noformat') || file.path.indexOf('README.md') === -1) {
      this.push(file);
      return cb();
    }
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb-init:', 'Streaming is not supported.'));
      return cb();
    }

    var str = format(file.contents.toString());
    file.contents = new Buffer(str);
    this.push(file);
    return cb();
  });
};


function format(str) {
  str = str.replace(/(?:\r\n|\n){3,}/g, '\n\n');
  var headingRe = /^(#{1,6})\s*([^\n]+)\s+/gm;
  var boldRe = /^\s+\*\*([^\n]+)\*\*(?=\n)\s+/gm;
  var match;

  while(match = headingRe.exec(str)) {
    str = str.split(match[0]).join(match[1] + ' ' + match[2] + '\n\n');
  }

  while(match = boldRe.exec(str)) {
    str = str.split(match[0]).join('\n**' + match[1] + '**\n\n');
  }
  return str.trim();
}
