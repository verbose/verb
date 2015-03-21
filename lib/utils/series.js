'use strict';

/**
 * Run middleware in series
 */

module.exports = function series_(fns) {
  return function (file, cb) {
    eachSeries(fns, function (fn, next) {
      fn(file, next);
    }, cb);
  };
};

// series fn from async library
function eachSeries(arr, iterator, cb) {
  cb = cb || function () {};
  if (!arr.length) {
    return cb();
  }

  var completed = 0;
  var iterate = function () {
    iterator(arr[completed], function (err) {
      if (err) {
        cb(err);
        cb = function () {};
      } else {
        completed += 1;
        if (completed >= arr.length) {
          cb();
        } else {
          iterate();
        }
      }
    });
  };
  iterate();
}
