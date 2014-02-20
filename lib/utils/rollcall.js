/*
 * rollcall
 * https://github.com/jonschlinkert/rollcall
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

const fs = require('fs');
const path = require('path');
const cwd = require('cwd');

module.exports = function() {
  var args = [].slice.call(arguments);

  // If the last argument is a function, remove it from args.
  var fn = typeof (args[args.length - 1]) === 'function' ? args.pop() : {};
  var dirpath = path.join.apply(path, args);

  // resolved path from the CWD to the target directory
  var dir = path.join.bind(null, cwd(dirpath, './'));

  fs.readdirSync(dir()).forEach(function(filepath) {
    // If the last arg was a function, use it on filepaths.
    filepath = (typeof fn === 'function') ? fn(filepath) : filepath;

    var name = path.basename(filepath, path.extname(filepath));
    // Exclude `index.js` from the result set
    if(!~filepath.search('index.js')) {
      // Require each file using its fully resolved
      // path, and export each module by its filename
      exports[name] = require(dir(filepath));
    }
  });

  return exports;
};