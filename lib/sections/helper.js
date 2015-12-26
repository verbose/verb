'use strict';

var utils = require('../../utils');

module.exports = function(config) {
  config = config || {};

  return function(name, context) {
    var section = this.app.sections.getView(name);

    return '';
  };
};
