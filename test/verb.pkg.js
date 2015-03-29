/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('package.json', function () {
  it('should set a project\'s package.json on `verb.cache.data`:', function () {
    verb.cache.data.name.should.equal('verb');
  });
});
