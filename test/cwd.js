/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('cwd', function () {
  it('should set the cwd:', function () {
    verb.option('cwd', __dirname);
    verb.options.cwd.should.equal(__dirname);
  });
});
