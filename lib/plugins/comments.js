'use strict';

var through = require('through2');
var PluginError = require('plugin-error');

module.exports = plugin('verb', 'comments');

/**
 * Apply basic formatting to markdown
 */

function plugin(appname, name) {
  var pluginname = appname + '-' + name + ':';

  return function commentsPlugin(options) {
    var opts = this.get('argv');

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
      str = stripHbsComments(str, opts);
      str = stripTmplComments(str, opts);
      str = stripHtmlComments(str, opts);

      // rebuffer contents
      file.contents = new Buffer(str);
      this.push(file);
      return cb();
    });
  };
}

function stripHbsComments(str, opts) {
  return strip(str, '{{!', '}}', opts);
}

function stripTmplComments(str, opts) {
  return strip(str, '{{#', '#}}', opts);
}

function stripHtmlComments(str, opts) {
  str = strip(str, '<!-- strip', '-->', opts);
  return strip(str, '<!--strip', '-->', opts);
}

function strip(str, lt, rt, opts) {
  if (opts && opts.stripComments === false) return str;
  var a = str.indexOf(lt);
  var b = str.indexOf(rt, a);

  while(a !== -1 && b !== -1) {
    str = str.slice(0, a) + str.slice(b + rt.length);
    a = str.indexOf(lt);
    b = str.indexOf(rt, a);
  }
  return str;
}
