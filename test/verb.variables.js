/*!
 * verb <https://github.com/verbose/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
var orig = process.cwd();
require('should');

describe('verb defaults', function () {
  beforeEach(function (done) {
    verb = new verb.Verb();
    done();
  });
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });
  after(function () {
    process.chdir(orig);
  });

  describe('when an instance of verb is initialized:', function () {
    it('should load the verb package.json onto the `verb` object:', function () {
      verb.should.have.property('verb');
      verb.verb.should.have.property('name', 'verb');
    });

    it('should load the user\'s package.json onto the `env` object:', function () {
      verb.should.have.property('env');
      verb.env.should.have.property('name', 'foo');
    });
  });
});
