'use strict';

var parse = require('parse-copyright');

module.exports = function copyright(file, next) {
  try {
    if (typeof file.data.copyright === 'undefined') {
      file.data.copyright = parse(file.content);
    }
  } catch (err) {
    throw new Error('copyright middleware:', err);
  }
  next();
};
