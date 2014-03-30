// node_modules
var expect = require('chai').expect;

// Local libs
var verb = require('../');
var utils = require('../lib/utils');

describe('utils.adjust.headings', function () {


  /**
   * Escaped templates
   */

  describe('when a template tag is escaped', function () {
    it('should not be evaluated by Lo-Dash, and unescaped in the output.', function () {
      var actual = verb.process('{%%= name %}');
      var expected = '{%= name %}';
      expect(actual.content).to.eql(expected);
    });
  });


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
        '# {%%= name %}',
        '',
        '> {%%= description %}',
        '',
        '## Overview',
        '{%%= docs("overview.md") %}',
        '',
        '## Options',
        '{%%= docs("options.md") %}',
        '```'
      ].join('\n');

      var expected = [
        '## Example ',
        '',
        '### Document',
        '',
        '```js',
        '# {%%= name %}',
        '',
        '> {%%= description %}',
        '',
        '## Overview',
        '{%%= docs("overview.md") %}',
        '',
        '## Options',
        '{%%= docs("options.md") %}',
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

describe('utils.authors', function() {

  describe('when utils.authors() is called', function() {

    it('should return an array of authors', function() {
      var expected = [
        {
          name: 'Jon Schlinkert',
          email: '',
          url: 'https://github.com/jonschlinkert'
        },
        {
          name: 'Brian Woodward',
          email: '',
          url: 'https://github.com/doowb'
        }
      ];
      var actual = utils.authors('test/fixtures/AUTHORS');
      expect(actual).to.eql(expected);
    });

  });

});


describe('utils.block', function() {

  describe('when utils.block() is called with a string', function() {

    it('should execute as a block template', function() {

      var expected = "\n - Jon Schlinkert\n";

      var tmpl = [
        '{{block author}}',
        ' - {%= name %}',
        '{{/block}}'
      ].join('\n');

      var actual = utils.block(verb).block(tmpl);
      expect(actual).to.eql(expected);
    });

  });

});

describe('utils.condense', function() {

  describe('when utils.condense() is called with a string and no seperator', function() {

    it('should condense the strings', function() {
      var expected = [
        '- foo',
        '- bar',
        '- baz'
      ].join('\n');

      var input = [
        ' - foo',
        ' - bar',
        ' - baz'
      ].join('\n\n');

      var actual = utils.condense(input);
      expect(actual).to.eql(expected);
    });

  });

  describe('when utils.condense() is called with a string and a custom seperator', function() {

    it('should condense the strings on the seperator', function() {
      var expected = [
        'foo',
        'bar',
        'baz'
      ].join(',');

      var input = [
        '\tfoo  ',
        ' bar\t',
        '  baz  '
      ].join(' , ');
      var actual = utils.condense(input, ',');
      expect(actual).to.eql(expected);
    });

  });

  describe('when utils.condense() is called with a string with \\r\\n line endings', function() {

    it('should condense the strings', function() {
      var expected = [
        '- foo',
        '- bar',
        '- baz'
      ].join('\n');

      var input = [
        ' - foo',
        ' - bar',
        ' - baz'
      ].join('\r\n');

      var actual = utils.condense(input);
      expect(actual).to.eql(expected);
    });

  });


});

describe('utils.contributors', function() {

  describe('when utils.contributors() is called with no configuration', function() {

    it('should return an empty string', function() {
      var expected = '';
      var actual = utils.contributors();
      expect(actual).to.eql(expected);
    });

  });

  describe('when utils.contributors() is called with a configuration and no prefix', function() {

    it('should return a markdown list of contributor names', function() {
      var config = {
        contributors: [
          { name: 'Jon Schlinkert' },
          { name: 'Brian Woodward' }
        ]
      };

      var expected = [
        '* Jon Schlinkert',
        '* Brian Woodward'
      ].join('\n');

      var actual = utils.contributors(config);
      expect(actual).to.eql(expected);
    });

  });

  describe('when utils.contributors() is called with a configuration and prefix', function() {

    it('should return a markdown list of contributor names with given prefix', function() {
      var config = {
        contributors: [
          { name: 'Jon Schlinkert' },
          { name: 'Brian Woodward' }
        ]
      };

      var expected = [
        ' - Jon Schlinkert',
        ' - Brian Woodward'
      ].join('\n');

      var actual = utils.contributors(config, ' - ');
      expect(actual).to.eql(expected);
    });

  });

});


describe('utils.date:', function () {
  describe('when utils.date():', function () {
    it('should return the current year.', function () {
      var actual = utils.date('YYYY');
      expect(actual).to.eql(2014);
    });

    it('should return the full date.', function () {
      var actual = utils.date('full');
      expect(actual.indexOf(2014) !== -1).to.eql(true);
    });
  });
});



describe('utils.strip:', function () {
  it('should strip whitespace surrounding the string.', function () {
    var actual = utils.strip('  abc   ');
    expect(actual).to.eql('abc');
  });

  it('should strip whitespace surrounding the string.', function () {
    var actual = utils.strip('\n abc \n abc ');
    expect(actual).to.eql('abc abc');
  });
});


describe('utils.reverse:', function () {
  it('should return the reversed string.', function () {
    var actual = utils.reverse('abc');
    expect(actual).to.eql('cba');
  });
});


describe('utils.username:', function () {
  describe('when utils.username() is used on a github URL:', function () {
    var pkg = require('../package');

    it('should extract the username from the author URL`.', function () {
      var actual = utils.username(verb.context.author.url);
      var expected = 'jonschlinkert';
      expect(actual).to.eql(expected);
    });

    it('should extract the username from a license URL.', function () {
      var actual = utils.username(pkg.licenses[0].url);
      var expected = 'assemble';
      expect(actual).to.eql(expected);
    });

    it('should extract the username from the repository URL with a `https` protocol.', function () {
      var actual = utils.username(pkg.repository.url);
      var expected = 'assemble';
      expect(actual).to.eql(expected);
    });

    it('should extract the username from the repository URL with a `git` protocol.', function () {
      var actual = utils.username('git://github.com/jonschlinkert/verb.git');
      var expected = 'jonschlinkert';
      expect(actual).to.eql(expected);
    });

    it('should extract the username.', function () {
      var actual = utils.username(pkg.homepage);
      var expected = 'assemble';
      expect(actual).to.eql(expected);
    });
  });

});
