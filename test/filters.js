// node_modules
var expect = require('chai').expect;

// Local libs
var phaser = require('../');


describe('Phaser filters', function () {


  describe('filters.date:', function () {
    it('should return the current year.', function () {
      var actual = phaser('{%= _.date("YYYY") %}');
      expect(actual.content).to.eql('2014');
    });

    it('should return the full date.', function () {
      var actual = phaser('{%= _.date("full") %}');
      expect(actual.content.indexOf(2014) !== -1).to.eql(true);
    });
  });



  describe('filters.reverse:', function () {
    it('should return the reversed string.', function () {
      var actual = phaser('{%= _.reverse("abc") %}', {
        filters: 'test/filters/reverse.js'
      });
      expect(actual.content).to.eql('cba');
    });
  });

  describe('filters.lowercase:', function () {
    it('should return the lowercased string.', function () {
      var actual = phaser('{%= _.lowercase("ABC") %}', {
        filters: 'test/filters/*.js'
      });
      expect(actual.content).to.eql('abc');
    });
  });

  /**
   * filters:author
   */

  describe('meta.authors:', function () {
    it('should return the name of the first author from the AUTHORS file.', function () {
      var actual = phaser('{%= authors %}');
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });

    it('should return the name of the first author from the AUTHORS file.', function () {
      var actual = phaser('{%= name %}');
      console.log(actual.context);
      // console.log(actual.context.authors);
      // var expected = 'Jon Schlinkert';
      // expect(actual.context.authors[0].name).to.eql(expected);
    });
  });

  /**
   * filters: contributors
   */

  describe('meta.contributors:', function () {
    it.skip('should return the name of the first contributor listed.', function () {
      var actual = phaser('{%= contributors[0].name %}');
      var expected = 'Jon Schlinkert';
      expect(actual).to.eql(expected);
    });
  });

  describe('_.contributors:', function () {
    it.skip('should return the name of the contributors using a filter.', function () {
      var actual = phaser('{%= _.contributors() %}');
      var expected = '* Jon Schlinkert\n* Brian Woodward';
      expect(actual).to.eql(expected);
    });
  });

  describe('meta.homepage:', function () {
    it.skip('should return a normalized version of the homepage URL listed in package.json.', function () {
      var actual = phaser('{%= homepage %}');
      var expected = 'https://github.com/jonschlinkert/phaser';
      expect(actual).to.eql(expected);
    });

    it.skip('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
      var actual = phaser('{%= homepage %}', {
        metadata: {
          homepage: 'git://github.com/foo/bar'
        }
      });
      var expected = 'https://github.com/foo/bar';
      expect(actual).to.eql(expected);
    });

    it.skip('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
      var actual = phaser('{%= homepage %}', {
        metadata: {
          homepage: 'git://github.com/baz/quux/'
        }
      });
      var expected = 'https://github.com/baz/quux/';
      expect(actual).to.eql(expected);
    });

    it.skip('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
      var actual = phaser('{%= _.homepage() %}');
      var expected = 'https://github.com/jonschlinkert/phaser';
      expect(actual).to.eql(expected);
    });
  });

  describe('process template filters:', function () {
    it.skip('should return the authors from the config or the "AUTHORS" file.', function () {
      var tmpl = '{% _.each(authors, function(author) { %} + [{%= author.name %}]({%= author.url %})\n {% }); %}';
      var actual = phaser(tmpl);
      var expected = '+ [Jon Schlinkert](https://github.com/jonschlinkert)\n  + [Brian Woodward](https://github.com/doowb)\n ';
      expect(actual).to.eql(expected);
    });

    it.skip('should return the names of the authors from config or the "AUTHORS" file.', function () {
      var actual = phaser('{%= _.authors("name") %}');
      var expected = 'Jon Schlinkert,Brian Woodward';
      expect(actual).to.eql(expected);
    });

    it.skip('should pluck the names of the authors from the config or the "AUTHORS" file.', function () {
      var actual = phaser('{%= _.pluck(authors, "name") %}');
      var expected = 'Jon Schlinkert,Brian Woodward';
      expect(actual).to.eql(expected);
    });
  });
});