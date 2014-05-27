'use strict';

var EventEmitter2 = require('eventemitter2').EventEmitter2;

var event =  new EventEmitter2({
  wildcard: true,
  delimiter: ':',
  newListener: false,
  maxListeners: 0
});

module.exports = event;
