/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

var file     = require('fs-utils');
var mdtoc    = require('marked-toc');
var template = require('template');
var _        = require('lodash');


var utils = require('../utils');

var relative = function(from, to) {
  from = !file.isDir(from) ? path.dirname(from) : from;
  var rel = path.relative(path.resolve(from), path.resolve(to));
  return file.normalizeSlash(rel);
};

var tmpl = '<%= depth %><%= bullet %>[<%= heading %>](<%= url %>)\n';

// Custom mixins
module.exports = function(config, options, params) {
  var phaserOpts = _.extend({sep: '\n'}, options);

  exports.toc = function(src, options) {
    var opts = _.extend(phaserOpts, {toc: {firsth1: true}});
    opts.toc = _.defaults({template: tmpl}, options, opts.toc);

    if(src) {
      return utils.expand(src).map(function(filepath) {
        var link = relative(opts.dest, filepath);
        var name = file.base(filepath);
        var heading = _.safename(name, {omit: 'docs', blacklist: false});
        var content = file.readFileSync(filepath);
        var md = mdtoc(content, opts.toc);

        var output = md.data.map(function(obj) {
          obj = _.extend(obj, {
            path: link,
            url: link + '/#' + obj.url,
            bullet: '* '
          });
          return template(tmpl, obj);
        }).join('');

        // console.log(output);
        var section = '# ' + _.str.titleize(heading) + '\n\n';
        return section + output;
      }).join(opts.sep);
    } else {
      return utils.toc(params.page.content);
    }
  };

  return exports;
};