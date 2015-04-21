'use strict';

var Store = require('data-store');

/**
 * Create a global data store for user values.
 */

module.exports = function store_() {
  this.store = new Store('verb');
};
