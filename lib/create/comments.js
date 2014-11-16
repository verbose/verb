'use strict';

var path = require('path');
var glob = require('globby');
var debug = require('debug')('template:create:comment');
var extend = require('extend-shallow');
var jscomments = require('js-comments');

module.exports = function(app, options) {
  return function comment(patterns, options) {
    var opts = extend({sep: '\n', dest: 'README.md'}, options);
    var ctx = extend({}, this.context);

    var cwd = ctx.filepath
      ? path.dirname(ctx.filepath)
      : process.cwd();


    if (opts.dep) {
      var Lookup = require('lookup-deps');
      var lookup = new Lookup();
      var dep = lookup.paths(opts.dep);
      if (dep) {
        cwd = path.resolve(dep[opts.dep]);
      }
    }

    return glob.sync(patterns, {cwd: cwd}).map(function (fp) {
      return jscomments(path.join(cwd, fp), opts.dest, opts);
    }).join('\n');
  };
};

  // return function (name, cwd) {
  //   debug('creating subtype: ', name);

  //   cwd = cwd || path.join(process.cwd(), 'templates');

  //   app.create('comment', options, [
  //     function (patterns, next) {
  //       var fp = path.join(cwd, patterns);
  //       debug('subtype ' + name + ' loading: ', fp);
  //       next(null, mapFiles(fp, options));
  //     },
  //     function (files, next) {

  //       next(null, files);
  //     }
  //   ],

  //   // handle errors
  //   function (err) {
  //     if (err) console.log('[comments]: ', err);
  //     debug('[comments] ' + name + 'error: ', err);
  //   });
  // };