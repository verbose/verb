'use strict';

module.exports = function(options) {
  return function(app) {
    if (this.isRegistered('base-errors')) return;
    // to do
    this.errors = this.errrors || [];
  };
}
