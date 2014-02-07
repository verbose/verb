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


describe('utils.adjust.headings', function () {


  /**
   * Utils:headings
   */

  describe('when utils.adjust.headings is used', function () {
    it('should add one level to each heading.', function () {
      var actual = utils.adjust.headings('# Heading');
      var expected = '## Heading';
      expect(actual).to.eql(expected);
    });

    it('should add one level to each heading.', function () {
      var actual = utils.adjust.headings('## Heading');
      var expected = '### Heading';
      expect(actual).to.eql(expected);
    });

    it('should not adjust heading levels in code backticks.', function () {
      var actual = utils.adjust.headings('`## Heading`');
      var expected = '`## Heading`';
      expect(actual).to.eql(expected);
    });

    it('should not adjust headings in code blocks.', function () {
      var actual = utils.adjust.headings('```\n## Heading\n```');
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

      var actual = utils.adjust.headings(fixture);
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

describe('utils.date:', function () {
  describe('when utils.date():', function () {
    it('should return the current year.', function () {
      var actual = utils.date(new Date(), 'YYYY');
      expect(actual).to.eql(2014);
    });

    it('should return the full date.', function () {
      var actual = utils.date(new Date(), 'full');
      expect(actual.indexOf(2014) !== -1).to.eql(true);
    });
  });
});


describe('utils.reverse:', function () {
  it('should return the reversed string.', function () {
    var actual = utils.reverse('abc');
    expect(actual).to.eql('cba');
  });
});



describe('mixins.lowercase:', function () {
  it('should return the lowercased string.', function () {
    var actual = phaser('{%= _.lowercase("ABC") %}', {
      mixins: 'test/mixins/*.js'
    });
    expect(actual.content).to.eql('abc');
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
