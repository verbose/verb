var expect = require('chai').expect;
var phaser = require('../');


describe('Phaser filters', function () {

  describe('filters.reverse:', function () {
    it('should return the reversed string.', function () {
      var actual = phaser.process('{%= reverse("abc") %}');
      expect(actual.content).to.eql('cba');
    });
  });

  describe('filters.lowercase:', function () {
    it('should return the lowercased string.', function () {
      var actual = phaser.process('{%= lowercase("ABC") %}', {
        filters: './test/filters/*.js'
      });
      expect(actual.content).to.eql('abc');
    });
  });

  /**
   * filters:author
   */

  describe('meta.authors:', function () {
    it('should return the name of the first author from the AUTHORS file.', function () {
      var actual = phaser.process('{%= authors[0].name %}');
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });

    it('should return the name of the second author from the AUTHORS file.', function () {
      var actual = phaser.process('{%= authors[1].name %}');
      var expected = 'Brian Woodward';
      expect(actual.content).to.eql(expected);
    });
  });

  describe('process template filters:', function () {
    it('should return the authors from the config or the "AUTHORS" file.', function () {
      var tmpl = '{% _.each(authors, function(author) { %} + [{%= author.name %}]({%= author.url %})\n {% }); %}';
      var actual = phaser.process(tmpl);
      var expected = '+ [Jon Schlinkert](https://github.com/jonschlinkert)\n  + [Brian Woodward](https://github.com/doowb)\n ';
      expect(actual.content).to.eql(expected);
    });

    it('should pluck the names of the authors from the config or the "AUTHORS" file.', function () {
      var actual = phaser.process('{%= _.pluck(authors, "name") %}');
      var expected = 'Jon Schlinkert,Brian Woodward';
      expect(actual.content).to.eql(expected);
    });
  });

  /**
   * filters: contributors
   */

  describe('meta.contributors:', function () {
    it('should return the name of the first contributor listed.', function () {
      var actual = phaser.process('{%= contributors[0].name %}', {contributors: [{name: 'Jon Schlinkert', url: ''}, {name: 'Brian Woodward', url: ''}]});
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });
  });

  /**
   * listify
   */

  describe('listify:', function () {
    it('should flatten authors array and convert it to a list.', function () {
      var actual = phaser.process('{%= listify(keywords) %}', {
        metadata: {
          keywords: ["docs", "documentation", "docs generator", "generator", "doc"]
        }
      });
      var expected = 'docs, documentation, docs generator, generator, doc';
      expect(actual.content).to.eql(expected);
    });
  });
});