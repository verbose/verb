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


describe('utils.adjustHeadings', function () {


  /**
   * Utils:headings
   */

  describe('when utils.adjustHeadings is used', function () {
    it('should add one level to each heading.', function () {
      var actual = utils.adjustHeadings('# Heading');
      var expected = '## Heading';
      expect(actual).to.eql(expected);
    });

    it('should add one level to each heading.', function () {
      var actual = utils.adjustHeadings('## Heading');
      var expected = '### Heading';
      expect(actual).to.eql(expected);
    });

    it('should not adjust heading levels in code backticks.', function () {
      var actual = utils.adjustHeadings('`## Heading`');
      var expected = '`## Heading`';
      expect(actual).to.eql(expected);
    });

    it('should not adjust headings in code blocks.', function () {
      var actual = utils.adjustHeadings('```\n## Heading\n```');
      var expected = '```\n## Heading\n```';
      expect(actual).to.eql(expected);
    });

    it('should not adjust headings in fenced code blocks.', function () {
      var fixture = [
        '# Example ',
        '',
        '## Document',
        '',
        '```js',
        '# [%= name %]',
        '',
        '> [%= description %]',
        '',
        '## Overview',
        '[%= doc("overview.md") %]',
        '',
        '## Options',
        '[%= doc("options.md") %]',
        '```'
      ].join('\n');

      var expected = [
        '## Example ',
        '',
        '### Document',
        '',
        '```js',
        '# [%= name %]',
        '',
        '> [%= description %]',
        '',
        '## Overview',
        '[%= doc("overview.md") %]',
        '',
        '## Options',
        '[%= doc("options.md") %]',
        '```'
      ].join('\n');

      var actual = utils.adjustHeadings(fixture);
      expect(actual).to.eql(expected);
    });

  });
});

describe('utils.arrayify:', function () {
  describe('when utils.arrayify() is used on a string:', function () {
    it('should coerce the string to an array.', function () {
      var actual = utils.arrayify('str');
      var expected = ['str'];
      expect(actual).to.eql(expected);
    });
  });

  describe('when utils.arrayify() is used on an array:', function () {
    it('should leave the array as-is.', function () {
      var actual = utils.arrayify(['str']);
      var expected = ['str'];
      expect(actual).to.eql(expected);
    });
  });
});


describe('utils.username:', function () {
  describe('when utils.username() is used on a github URL:', function () {
    var pkg = require('../package');

    it('should extract the username from the author URL`.', function () {
      var actual = utils.username(pkg.author.url);
      var expected = 'jonschlinkert';
      expect(actual).to.eql(expected);
    });

    it('should extract the username from a license URL.', function () {
      var actual = utils.username(pkg.licenses[0].url);
      var expected = 'jonschlinkert';
      expect(actual).to.eql(expected);
    });

    it('should extract the username from the repository URL with a `https` protocol.', function () {
      var actual = utils.username(pkg.repository.url);
      var expected = 'jonschlinkert';
      expect(actual).to.eql(expected);
    });

    it('should extract the username from the repository URL with a `git` protocol.', function () {
      var actual = utils.username('git://github.com/jonschlinkert/phaser.git');
      var expected = 'jonschlinkert';
      expect(actual).to.eql(expected);
    });

    it('should extract the username.', function () {
      var actual = utils.username(pkg.homepage);
      var expected = 'jonschlinkert';
      expect(actual).to.eql(expected);
    });
  });

});
