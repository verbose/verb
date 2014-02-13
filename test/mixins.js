var expect = require('chai').expect;
var phaser = require('../');


/**
 * Mixin: contributors
 */

describe('mixins:', function () {
  describe('_.authors:', function () {
    it('should return the names of the authors from config or the "AUTHORS" file.', function () {
      var actual = phaser.process('{%= _.authors("name") %}');
      var expected = 'Jon Schlinkert,Brian Woodward';
      expect(actual.content).to.eql(expected);
    });
  });

  describe('_.contributors:', function () {
    it('should return the name of the contributors using a mixin.', function () {
      var actual = phaser.process('{%= _.contributors() %}');
      var expected = '* Jon Schlinkert\n* Brian Woodward';
      expect(actual.content).to.eql(expected);
    });
  });

  describe('_.homepage:', function () {
    it('should return a normalized version of the custom homepage URL using a mixin.', function () {
      var actual = phaser.process('{%= _.homepage() %}');
      var expected = 'https://github.com/jonschlinkert/phaser';
      expect(actual.content).to.eql(expected);
    });
  });
});
