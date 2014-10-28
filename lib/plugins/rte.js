'use strict';

var path = require('path');
var through = require('through2');
var extend = require('mixin-deep');
var rte = require('rte');

module.exports = function(dest, template, locals) {
  template = template || ':basename:extname';
  console.log(arguments);

  return through.obj(function (file, enc, cb) {
    // console.log(dest);
    // console.log(file.base);
    // file.path = rte(file.relative, template, extend({dest: dest}, locals));

    this.push(file);
    cb();
  });
};
