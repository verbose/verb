'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('globby');
var relative = require('relative');
var toc = require('markdown-toc');
var mdu = require('markdown-utils');

/**
 * Generate a Table of Contents for a glob of files.
 */

module.exports = function multitoc_(file, next) {
  var str = file.content;
  var i = str.indexOf('<!-- toc(');

  if (i === -1) return next();

  var tag = str.slice(i, str.indexOf('-->') + 3);
  var pattern = strip(tag);

  var args = toArgs(pattern);
  var files = [];

  if (args.length && args[1]) {
    var opts = args[1] || {};
    files = glob.sync(args[0], opts).map(function (fp) {
      return path.join(opts.cwd || process.cwd(), fp);
    });
  } else {
    files = glob.sync(args[0]);
  }

  if (!files.length) return next();
  var res = files.map(generate).join('\n');
  file.content = str.split(tag).join(res);
  next();
};

function generate(fp, options) {
  options = options || {};
  fp = path.join(options.cwd || process.cwd(), fp);
  var str = fs.readFileSync(fp, 'utf8');
  var first = str.split('\n')[0].trim().slice(2).trim();

  // don't generate a TOC for a template
  if (/\{%=/.test(first)) return '';
  var res = '';

  res += mdu.h2(mdu.link(first, relative(fp)));
  res += '__AFTER__';
  res += '\n';

  var table = toc(str, {
    linkify: function(tok, heading) {
      var url = relative(fp);
      url += '/#';
      url += toc.slugify(heading);
      tok.content = mdu.link(tok.content, url);
      return tok;
    }
  });

  res += table.content;
  res += '\n';

  res = res.split(/\n{2,}/).join('\n');
  res = res.split('__AFTER__').join('\n');
  return res;
}

function strip(str) {
  str = str.replace(/<!--\s*toc\(/, '');
  str = str.replace(/\)\s*-->/, '');
  return str.trim();
}

function toArgs(pattern) {
  var args = pattern.split(',').filter(Boolean);
  args[0] = args[0].trim().replace(/^['"]|['"]$/g, '');
  args[1] = args[1] ? JSON.parse(args[1].trim()) : null;
  return args;
}
