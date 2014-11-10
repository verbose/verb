'use strict';

module.exports = function escapeDot(str) {
  return str.replace(/\./g, '\\.');
};