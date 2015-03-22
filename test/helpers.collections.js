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
  it('should use helpers from the template-helpers library:', function (done) {
    verb.render('{%= add(1, 2) %}', function (err, content) {
      if (err) console.log(err);
      content.should.equal('3');
      done();
    });
  });

  it('should use helpers from the markdown-utils library:', function (done) {
    verb.render('{%= mdu.link("a", "b") %}', function (err, content) {
      if (err) console.log(err);
      content.should.equal('[a](b)');
      done();
    });
  });
});
