'use strict';

module.exports = function(app) {
  return function(engines) {
    for (var key in engines) {
      if (engines.hasOwnProperty(key)) {
        var val = engines[key];
        this.engine(key, val.fn, val.options);
      }
    }
  };
};
