'use strict';

var utils = require('./');

module.exports = function (app) {
  app.helper('date', function () {
    return new Date();
  });

  var mdu = require('markdown-utils');
  app.helperGroup('mdu', mdu);

  app.helper('log', function (msg) {
    console.log.apply(console, arguments);
  });

  // app.helper('npm', function (names) {
  //   var url = 'https://www.npmjs.com/package/';
  //   var res = '';
  //   utils.arrayify(names).forEach(function (name) {
  //     res += '+ ' + mdu.link(name, url + name) + '\n';
  //   });
  //   return res;
  // });

  app.asyncHelper('related', require('helper-related'));

  app.asyncHelper('trim', function (str) {
    return str.trim();
  });

  // app.helper('license', function (locals) {
  //   // var ctx = utils.merge({}, this.context, locals);

  // });

  app.helper('copyright', function () {

  });
};
