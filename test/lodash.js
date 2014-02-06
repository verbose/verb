/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path = require('path');

// node_modules
var expect = require('chai').expect;
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var phaser = require('../');
var utils = require('../lib/utils');


/**
 * Vanilla Lo-Dash, for comparison.
 */
describe('_.template', function () {

  describe('when using the Lo-Dash _.template method:', function () {
    it('should process a template with default delimiters.', function () {
      var compiled = _.template('hello <%= name %>');
      compiled({
        'name': 'fred'
      });
      var actual = compiled({
        'name': 'fred'
      });
      expect(actual).to.eql('hello fred');
    });

    it('should process a template with es6 delimiters.', function () {
      var compiled = _.template('hello ${ name }');
      compiled({
        'name': 'fred'
      });
      var actual = compiled({
        'name': 'fred'
      });
      expect(actual).to.eql('hello fred');
    });
  });
});
