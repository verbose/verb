// node_modules
var expect = require('chai').expect;
var file = require('fs-utils');

// Local libs
var verb = require('../');


describe('verb.read()', function () {

  describe('when a file path is passed:', function () {
    it('should read the file and process templates using package.json as context', function () {
      var actual = verb.read('test/fixtures/author.tmpl');
      var expected = 'Jon Schlinkert';
      expect(actual).to.eql(expected);
    });

    it('should read the file and process templates using package.json as context', function () {
      var actual = verb.read('test/fixtures/name.tmpl');
      var expected = 'verb';
      expect(actual).to.eql(expected);
    });
  });

  /**
   * options.data
   */

  describe('options:', function () {
    describe('when an arbitrary property is defined in the options:', function () {
      it('should extend the root context', function () {
        var actual = verb.read('test/fixtures/author.tmpl', {
          author: {name: "Brian Woodward"}
        });
        var expected = 'Brian Woodward';
        expect(actual).to.eql(expected);
      });
    });
  });

  describe('options.data:', function () {
    describe('when a raw object is defined in options.data:', function () {
      it('should extend the `data` object', function () {
        var actual = verb.read('test/fixtures/author.tmpl', {
          data: {
            author: {name: "Brian Woodward"}
          }
        });
        var expected = 'Brian Woodward';
        expect(actual).to.eql(expected);
      });
    });
  });

  describe('options.data (string):', function () {
    it('should extend the context with namespaced data, from a JSON file', function () {
      var fixture = 'test/fixtures/author.tmpl';
      var actual = verb.read(fixture, {
        data: 'test/fixtures/data/author.json',
      });
      var expected = 'Brian Woodward';
      expect(actual).to.eql(expected);
    });

    it('should extend the context with non-namespaced data, from a JSON file', function () {
      var fixture = 'test/fixtures/name.tmpl';
      var actual = verb.read(fixture, {
        data: 'test/fixtures/data/author.json',
      });
      var expected = 'Brian Woodward';
      expect(actual).to.eql(expected);
    });
  });

  /**
   * options.data (minimatch)
   */

  describe('options.data (glob):', function () {
    it('should extend the context with non-namespaced data, from a globbed JSON file', function () {
      var fixture = 'test/fixtures/name.tmpl';
      var actual = verb.read(fixture, {
        data: 'test/fixtures/**/author.json',
      });
      var expected = 'Brian Woodward';
      expect(actual).to.eql(expected);
    });
  });

  /**
   * YAML Front matter
   */

  describe('YAML front-matter:', function () {
    it('should extend the context with data from YAML front matter.', function () {
      var fixture = 'test/fixtures/matter.md';
      var actual = verb.read(fixture);
      var expected = 'Matter';
      expect(actual).to.eql(expected);
    });

  });
});