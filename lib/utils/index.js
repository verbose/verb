<<<<<<< HEAD
/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

module.exports = require('./rollcall')(__dirname);
=======
'use strict';

var fs = require('fs');
var path = require('path');
var isFile = require('./isFile');

fs.readdirSync(__dirname).forEach(function (name) {
  var base = path.basename(name, path.extname(name));
  var fp = path.resolve(__dirname, name);

  if (!/index/.test(fp) && isFile(fp)) {
    exports[base] = require(fp);
  }
});
>>>>>>> github/master
