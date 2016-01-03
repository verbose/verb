'use strict';

var utils = require('../utils');
var load = require('./load');

module.exports = function(app, config) {
  config = config || {};
  var loaded = false;

  return function(name, options) {
    var app = this.app;

    if (!loaded) {
      loaded = true;
      load(app);
    }

    var context = utils.merge({}, config, this.context);
    var section = app.verb_sections.getView(name);
    // console.log(section)
    return '';
  };
};
