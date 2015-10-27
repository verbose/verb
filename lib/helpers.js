'use strict';

var utils = require('./utils');

module.exports = function () {
  this.asyncHelper('related', utils.related(this.options));
  this.asyncHelper('reflinks', utils.reflinks(this.options));

  this.helper('split', function (val) {
    return val.split(',');
  });

  this.helper('date', function () {
    return new Date();
  });

  this.helper('log', function (msg) {
    console.log.apply(console, arguments);
  });

  this.helper('trim', function (str) {
    return str.trim();
  });

  this.helper('apidocs', function () {
    // this.ask(locals)
  });
};
