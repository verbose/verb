'use strict';

var through = require('through2');
var PluginError = require('plugin-error');

module.exports = plugin('verb', 'comments');

/**
 * Apply basic formatting to markdown
 */

function plugin(appname, name, config) {
  var pluginname = appname + '-' + name + ':';

  return function commentsPlugin(locals) {
    return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }
      if (file.isStream()) {
        this.emit('error', new PluginError(pluginname, 'Streaming is not supported.'));
        return cb();
      }

      // strip code comments
      var str = file.contents.toString();
      str = stripTmplComments(str);
      str = stripHtmlComments(str);

      // rebuffer contents
      file.contents = new Buffer(str);
      this.push(file);
      return cb();
    });
  };
}

function stripHbsComments(str) {
  return strip(str, '{{!', '}}');
}

function stripTmplComments(str) {
  return strip(str, '{{#', '#}}');
}

function stripHtmlComments(str) {
  str = strip(str, '<!-- strip', '-->');
  return strip(str, '<!--strip', '-->');
}

function strip(str, lt, rt) {
  var a = str.indexOf(lt);
  var b = str.indexOf(rt, a);

  while(a !== -1 && b !== -1) {
    str = str.slice(0, a) + str.slice(b + rt.length);
    a = str.indexOf(lt, b);
    b = str.indexOf(rt, a);
  }
  return str;
}
