'use strict';

var fs = require('fs');
var glob = require('globby');
var relative = require('relative');
var toc = require('markdown-toc');
var mdu = require('markdown-utils');
var utils = require('../utils');

/**
 * Generate a Table of Contents for a glob of files.
 */

module.exports = function multitoc_(file, next) {
  var str = file.content;
  var toc = str.indexOf('<!-- toc(');

  if (toc !== -1) {
    var end = str.indexOf(')', toc);
    var pattern = str.slice(toc + 10, end - 1);
    var files = glob(pattern).map(generate).join('\n');
    file.content = replace(str, files, pattern);
  }
  next();
};

function generate(fp) {
  var str = fs.readFileSync(fp, 'utf8');
  var first = str.split('\n')[0].trim().slice(2).trim();
  var res = '';

  res += mdu.h2(mdu.link(first, relative(fp)));
  res += '__AFTER__';
  res += '\n';

  var table = toc(str, {
    linkify: function(tok, heading) {
      var url = relative(fp)
      url += '/#'
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

function replace(str, toc, glob) {
  var tag = '<!-- toc("' + glob + '") -->';
  var res = '';
  res += '\n';
  res += '\n';
  res += toc;
  res += '\n';
  return str.split(tag).join(res);
}
