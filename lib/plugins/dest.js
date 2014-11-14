'use strict';

/**
 * Module dependencies
 */

var through = require('through2');
var extend = require('extend-shallow');
var rte = require('rte');

/**
 * `dest` plugin
 */

module.exports = function destPlugin(dest, template, locals) {
  template = template || ':basename:extname';

  return through.obj(function (file, enc, cb) {
    file.path = rte(file.relative, template, extend({dest: dest}, locals));
    this.push(file);
    cb();
  });
};
