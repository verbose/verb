/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('verb', function () {
  it('should expose verb\'s package.json on `verb`:', function () {
    verb.verb.should.be.an.object;
    verb.verb.name.should.be.verb; // ;)
  });
});
