'use strict';

module.exports = function(app) {
  return function(val) {
    this.option(val);
  };
};
