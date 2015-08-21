'use strict';

var through = require('through2');
var Remarkable = require('remarkable');
var PluginError = require('plugin-error');
var prettify = require('pretty-remarkable');
var extend = require('extend-shallow');


module.exports = function(locals) {
  var argv = this.get('argv');
  var app = this;

  // add a trailing newline to docs?
  var newline = argv.newline || this.config.get('newline');

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    try {
      if (file.path.indexOf('README.md') === -1 || noformat(app, file, locals, argv)) {
        this.push(file);
        return cb();
      }

      // pass some extra formatting info to `pretty-remarkable`
      var opts = extend({}, locals, file.options);
      opts.username = app.get('data.username');
      opts.name = app.get('data.author.name');

      // prettify
      var str = pretty(file.contents.toString(), opts);
      str = str.trim() + (newline ? '\n' : '');
      str = fixList(str);

      // rebuffer contents
      file.contents = new Buffer(str);
      this.push(file);
      return cb();
    } catch(err) {
      this.emit('error', new PluginError('formatter plugin', err, {stack: true}));
      return cb();
    }
  });
};

/**
 * Fix list formatting
 */

function fixList(str) {
  str = str.replace(/([ ]{1,4}[+-] \[?[^)]+\)?)\n\n\* /gm, '$1\n* ');
  str = str.split('__{_}_*').join('**{*}**');
  return str;
}

/**
 * Instantiate `Remarkable` and use the `prettify` plugin
 * on the given `str`.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String}
 */

function pretty(str, options) {
  return new Remarkable(options)
    .use(prettify)
    .render(str);
}

/**
 * Push the `file` through if the user has specfied
 * not to format it.
 */

function noformat(app, file, locals, argv) {
  return app.isTrue('noformat') || app.isFalse('format')
    || file.noformat === true || file.format === false
    || locals.noformat === true || locals.format === false
    || argv.noformat === true || argv.format === false;
}
