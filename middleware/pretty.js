'use strict';

var through = require('through2');
var Remarkable = require('remarkable');
var PluginError = require('plugin-error');
var prettify = require('pretty-remarkable');
var extend = require('extend-shallow');


module.exports = function(app) {
  var argv = this.get('argv');
  var app = this;

  // add a trailing newline to docs?
  var newline = argv.newline || this.config.get('newline');

  return function (view, next) {
    // pass some extra formatting info to `pretty-remarkable`
    var opts = extend({}, app.options, view.options);
    opts.username = app.get('data.username');
    opts.name = app.get('data.author.name');

    var str = view.content;
    var res = extractTables(str);
    str = res.str;

    // prettify
    str = pretty(str, opts);
    str = str.trim() + (newline ? '\n' : '');
    str = fixParam(str);
    str = fixList(str);

    res.keys.forEach(function (key) {
      var table = res.tables[key].trim();
      str = str.split(key).join(table);
    });

  }
};

/**
 * Fix list formatting
 */

function fixList(str) {
  return str.replace(/([ ]{1,4}[+-] \[?[^)]+\)?)\n\n\* /gm, '$1\n* ');
}

/**
 * Fix params
 */

function fixParam(str) {
  return str.split('__{_}_*').join('**{any}**');
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
 * Push the `view` through if the user has specfied
 * not to format it.
 */

function noformat(app, view, locals, argv) {
  return app.isTrue('noformat') || app.isFalse('format')
    || view.noformat === true || view.format === false
    || locals.noformat === true || locals.format === false
    || argv.noformat === true || argv.format === false;
}


function extractTables(str) {
  var re = /^\s*[|](?=.*[|])(.*)$/;
  var lines = str.split(/\r\n|\r|\n/);
  var len = lines.length, i = -1;
  var tables = {};
  var inside = false;
  var prev = false;
  var num = 0;
  var content = '';
  var keys = [], key = '__TABLE_0_';

  while (++i < len) {
    var line = lines[i];

    if (re.test(line)) {
      if (prev) {
        keys.push(key);
        content += key;
        key = '__TABLE_' + (num++) + '_';
      }
      prev = false;
      inside = true;
      tables[key] = tables[key] || '';
      tables[key] += line + '\n';
    } else {
      content += line + '\n';
      inside = false;
      prev = true;
    }
  }

  var res = {};
  res.keys = keys;
  res.str = content;
  res.tables = tables;
  return res;
}
