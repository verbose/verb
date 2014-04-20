const expect = require('chai').expect;
const file = require('fs-utils');
const verb = require('../');


describe('verb.process()', function () {

  describe('when a Lo-Dash template is passed as a string:', function () {
    it('should use data from package.json as context', function () {
      var actual = verb.process('{%= name %}');
      var expected = 'verb';
      expect(actual.content).to.eql(expected);
    });

    it('should change the name of the project to a custom value from the root context.', function () {
      var actual = verb.process('{%= name %}', {
        name: "foo"
      });
      var expected = 'foo';
      expect(actual.content).to.eql(expected);
    });

    it('should change the name of the project to a custom value from the data object.', function () {
      var actual = verb.process('{%= name %}', {
        data: {name: "foo"}
      });
      var expected = 'foo';
      expect(actual.content).to.eql(expected);
    });

    it('should return the author name.', function () {
      var actual = verb.process('{%= author.name %}');
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });
  });



  describe('verb.process:', function () {
    it('should return a variable from the default config object', function () {
      var actual = verb.process('{%= name %}');
      var expected = 'verb';
      expect(actual.content).to.eql(expected);
    });

    it('should return a nested variable from the default config object', function () {
      var actual = verb.process('{%= author.name %}');
      var expected = 'Jon Schlinkert';
      expect(actual.content).to.eql(expected);
    });

    it('should update a variable on the root context.', function () {
      var actual = verb.process('{%= name %}', {
        name: "foo"
      });
      var expected = 'foo';
      expect(actual.content).to.eql(expected);
    });

    it('should update a variable on the data object.', function () {
      var actual = verb.process('{%= name %}', {
        data: {name: "bar"}
      });
      var expected = 'bar';
      expect(actual.content).to.eql(expected);
    });

  });


  describe('globbing:', function () {
    it('should extend the context with data from multiple globbed files.', function () {
      var fixture = file.readFileSync('test/fixtures/name.tmpl');
      var actual = verb.process(fixture, {
        data: 'test/fixtures/data/*.json'
      });
      actual = JSON.parse(JSON.stringify(actual));
      var expected = file.readJSONSync('test/expected/globbed-basic.json');
      expect(actual.foo).to.eql(expected.foo);
    });

    it('should extend the context with data from an array of globbed files.', function () {
      var fixture = file.readFileSync('test/fixtures/name.tmpl');
      var actual = verb.process(fixture, {
        data: ['test/fixtures/**/foo.json', 'test/fixtures/data/{a,b}*.json']
      });
      actual = JSON.parse(JSON.stringify(actual));
      var expected = file.readJSONSync('test/expected/globbed-array.json');
      expect(actual.bar).to.eql(expected.bar);
    });
  });

  /**
   * options.data (minimatch)
   */

  describe('options.data (glob):', function () {

    it('should extend the context with data from multiple globbed files.', function () {
      var fixture = file.readFileSync('test/fixtures/name.tmpl');
      var actual = verb.process(fixture, {
        data: 'test/fixtures/data/*.json'
      });
      actual = JSON.parse(JSON.stringify(actual));
      var expected = file.readJSONSync('test/expected/globbed-basic.json');
      expect(actual.foo).to.eql(expected.foo);
    });

    it('should extend the context with data from an array of globbed files.', function () {
      var fixture = file.readFileSync('test/fixtures/name.tmpl');
      var actual = verb.process(fixture, {
        data: ['test/fixtures/**/foo.json', 'test/fixtures/data/{a,b}*.json']
      });
      actual = JSON.parse(JSON.stringify(actual));
      var expected = file.readJSONSync('test/expected/globbed-array.json');
      expect(actual.bar).to.eql(expected.bar);
    });
  });
});