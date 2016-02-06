'use strict';

module.exports = function(app) {
  return function(helpers) {
    for (var key in helpers) {
      if (helpers.hasOwnProperty(key)) {
        var val = helpers[key];

        if (val.async = true) {
          this.asyncHelper(key, val.fn);
        } else {
          this.helper(key, val.fn);
        }
      }
    }
  };
};
