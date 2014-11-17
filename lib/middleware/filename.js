'use strict';

module.exports = function filename(file, next) {
  file.data = file.data || {};
  file.data.filename = '';
  next();
};
