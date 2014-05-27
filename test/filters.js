var expect = require('chai').expect;
var verb = require('../');


describe('Verb filters', function () {

  describe('filters.namify:', function () {
    it('should namify the string.', function () {
      var actual = verb.process('{%= namify(name) %}', {name: 'a B'});
      expect(actual.content).to.eql('aB');
    });
  });

  describe('filters.reverse:', function () {
    it('should return the reversed string.', function () {
      var actual = verb.process('{%= reverse("abc") %}');
      expect(actual.content).to.eql('cba');
    });
  });

  describe('filters.lowercase:', function () {
    it('should return the lowercased string.', function () {
      var actual = verb.process('{%= lowercase("ABC") %}', {
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
      var actual = verb.process('{%= authors[0].name %}', {authors: 'test/fixtures/AUTHORS'});
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });

    it('should return the name of the second author from the AUTHORS file.', function () {
      var actual = verb.process('{%= authors[1].name %}', {authors: 'test/fixtures/AUTHORS'});
      var expected = 'Brian Woodward';
      expect(actual.content).to.eql(expected);
    });
  });

  describe('process template filters:', function () {
    it('should return the authors from the config or the "AUTHORS" file.', function () {
      var tmpl = '{% _.each(authors, function(author) { %} + [{%= author.name %}]({%= author.url %})\n {% }); %}';
      var actual = verb.process(tmpl, {authors: 'test/fixtures/AUTHORS'});
      var expected = '+ [Jon Schlinkert](https://github.com/jonschlinkert)\n  + [Brian Woodward](https://github.com/doowb)\n ';
      expect(actual.content).to.eql(expected);
    });

    it('should pluck the names of the authors from the config or the "AUTHORS" file.', function () {
      var actual = verb.process('{%= _.pluck(authors, "name") %}', {authors: 'test/fixtures/AUTHORS'});
      var expected = 'Jon Schlinkert,Brian Woodward';
      expect(actual.content).to.eql(expected);
    });
  });

  /**
   * filters: contributors
   */

  describe('meta.contributors:', function () {
    it('should return the name of the first contributor listed.', function () {
      var actual = verb.process('{%= contributors[0].name %}', {contributors: [{name: 'Jon Schlinkert', url: ''}, {name: 'Brian Woodward', url: ''}]});
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });
  });

  /**
   * listify
   */

  describe('listify:', function () {
    it('should flatten authors array and convert it to a list.', function () {
      var actual = verb.process('{%= listify(keywords) %}', {
        metadata: {
          keywords: ["docs", "documentation", "docs generator", "generator", "doc"]
        }
      });
      var expected = 'docs, documentation, docs generator, generator, doc';
      expect(actual.content).to.eql(expected);
    });
  });
});