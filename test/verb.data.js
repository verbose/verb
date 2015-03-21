/*!
 * verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('helpers', function () {
  beforeEach(function (done) {
    verb = new verb.Verb();
    verb.engine('*', require('engine-lodash'));
    done();
  });

  describe('when helpers are registered with the `.helper()` method:', function () {
    it('should use them in templates:', function (done) {
      verb.helper('upper', function (str) {
        return str.toUpperCase();
      });

      verb.render('{%= upper(name) %}', {name: 'Jon Schlinkert'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('JON SCHLINKERT');
        done();
      });
    });
  });
});
