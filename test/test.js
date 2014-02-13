// node_modules
var util = require('util');
var expect = require('chai').expect;
var file = require('fs-utils');

// Local libs
var phaser = require('../');



describe('Phaser', function () {

  describe('phaser:', function () {
    it('should return the value of the name field in package.json', function () {
      var actual = phaser.process('{%= name %}').content;
      var expected = 'phaser';
      expect(actual).to.eql(expected);
    });

    it('should change the name of the project to a custom value from the root context.', function () {
      var actual = phaser.process('{%= name %}', {
        name: "foo"
      }).content;
      var expected = 'foo';
      expect(actual).to.eql(expected);
    });

    it('should change the name of the project to a custom value from the data object.', function () {
      var actual = phaser.process('{%= name %}', {
        data: {
          name: "foo"
        }
      }).content;
      var expected = 'foo';
      expect(actual).to.eql(expected);
    });

    it('should return the author name.', function () {
      var actual = phaser.process('{%= author.name %}').content;
      var expected = 'Jon Schlinkert';
      expect(actual).to.eql(expected);
    });
  });




  describe('phaser.process:', function () {
    it('should return a variable from the default config object', function () {
      var actual = phaser.process('{%= name %}');
      var expected = 'phaser';
      expect(actual.content).to.eql(expected);
    });

    it('should return a nested variable from the default config object', function () {
      var actual = phaser.process('{%= author.name %}');
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });

    it('should update a variable on the root context.', function () {
      var actual = phaser.process('{%= name %}', {
        name: "foo"
      });
      var expected = 'foo';
      expect(actual.content).to.eql(expected);
    });

    it('should update a variable on the data object.', function () {
      var actual = phaser.process('{%= name %}', {
        data: {
          name: "bar"
        }
      });
      var expected = 'bar';
      expect(actual.content).to.eql(expected);
    });

  });

  /**
   * phaser.read()
   */

  describe('phaser.read:', function () {
    it('should read a file and process templates.', function () {
      var fixture = 'test/fixtures/author.tmpl';
      var actual = phaser.read(fixture);
      var expected = 'Jon Schlinkert';
      expect(actual).to.eql(expected);
    });

    it('should read a file and process templates.', function () {
      var fixture = 'test/fixtures/name.tmpl';
      var actual = phaser.read(fixture);
      var expected = 'phaser';
      expect(actual).to.eql(expected);
    });
  });

  /**
   * options.data
   */

  describe('options.data (raw object):', function () {
    it('should extend the root context (options).', function () {
      var fixture = 'test/fixtures/author.tmpl';
      var actual = phaser.read(fixture, {
        author: {
          name: "Brian Woodward"
        }
      });
      var expected = 'Brian Woodward';
      expect(actual).to.eql(expected);
    });

    it('should extend the "data" object (options.data).', function () {
      var fixture = 'test/fixtures/author.tmpl';
      var actual = phaser.read(fixture, {
        data: {
          author: {
            name: "Brian Woodward"
          }
        }
      });
      var expected = 'Brian Woodward';
      expect(actual).to.eql(expected);
    });
  });

  describe('options.data (string):', function () {
    it('should extend the context with namespaced data, from a JSON file', function () {
      var fixture = 'test/fixtures/author.tmpl';
      var actual = phaser.read(fixture, {
        data: 'test/fixtures/data/author.json',
        namespace: true
      });
      var expected = 'Brian Woodward';
      expect(actual).to.eql(expected);
    });

    it('should extend the context with non-namespaced data, from a JSON file', function () {
      var fixture = 'test/fixtures/name.tmpl';
      var actual = phaser.read(fixture, {
        data: 'test/fixtures/data/author.json',
        namespace: false
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
      var actual = phaser.read(fixture, {
        data: 'test/fixtures/**/author.json',
        namespace: false
      });

      var expected = 'Brian Woodward';
      expect(actual).to.eql(expected);
    });

    it('should extend the context with data from multiple globbed files.', function () {
      var fixture = file.readFileSync('test/fixtures/name.tmpl');
      var actual = phaser.process(fixture, {
        data: 'test/fixtures/data/*.json'
      });
      actual = JSON.parse(JSON.stringify(actual));
      var expected = file.readJSONSync('test/expected/globbed-basic.json');
      expect(actual).to.eql(expected);
    });

    it('should extend the context with data from an array of globbed files.', function () {
      var fixture = file.readFileSync('test/fixtures/name.tmpl');
      var actual = phaser.process(fixture, {
        data: ['test/fixtures/**/foo.json', 'test/fixtures/data/{a,b}*.json']
      });
      actual = JSON.parse(JSON.stringify(actual));
      var expected = file.readJSONSync('test/expected/globbed-array.json');
      expect(actual).to.eql(expected);
    });
  });

  /**
   * YAML Front matter
   */

  describe('YAML front-matter:', function () {
    it('should extend the context with data from YAML front matter.', function () {
      var fixture = 'test/fixtures/matter.md';
      var actual = phaser.read(fixture);
      var expected = 'Matter';
      expect(actual).to.eql(expected);
    });

  });
});