'use strict';

/**
 * Run middleware in parallel
 *
 * @api private
 */

module.exports = function parallel_(fns) {
  return function (file, cb) {
    eachParallel(fns, function (fn, next) {
      fn(file, next);
    }, cb);
  };
};

// temporary each fn from async library
function eachParallel(arr, iterator, cb, thisArg) {
  cb = cb || function () {};
  if (!arr.length) {
    return cb();
  }
  var completed = 0;
  forEach(arr, function (x) {
    iterator(x, once(done, thisArg));
  });

  function done(err) {
    if (err) {
      cb(err);
      cb = function () {};
    } else {
      completed += 1;
      if (completed >= arr.length) {
        cb();
      }
    }
  }
}

function forEach(arr, iterator) {
  if (arr.forEach) {
    return arr.forEach(iterator);
  }
  for (var i = 0; i < arr.length; i += 1) {
    iterator(arr[i], i, arr);
  }
}

function once(fn, thisArg) {
  var called = false;
  return function () {
    if (called) throw new Error('Callback was already called.');
    called = true;
    fn.apply(thisArg, arguments);
  };
}
