/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('loaded helpers', function () {
  it('should use helpers from a module dependency:', function (done) {
    verb.render('{%= add(1, 2) %}', function (err, content) {
      if (err) console.log(err);
      content.should.equal('3');
      done();
    });
  });
});
