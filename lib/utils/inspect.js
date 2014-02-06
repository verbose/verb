/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var file = require('fs-utils');


/**
 * inspect
 */

module.exports = function(dest, data) {
  data = util.inspect(data, null, 2);
  file.writeFileSync(dest, data);
};