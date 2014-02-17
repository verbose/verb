var expect = require('chai').expect;
var phaser = require('../');


/**
 * Mixin: contributors
 */

describe('mixins:', function () {

  describe('_.homepage:', function () {
    it.skip('should return a normalized version of the custom homepage URL using a mixin.', function () {
      var actual = phaser.process('{%= _.homepage() %}');
      var expected = 'https://github.com/jonschlinkert/phaser';
      expect(actual.content).to.eql(expected);
    });
  });

  describe('mixins.date:', function () {
    it('should return the current year.', function () {
      var actual = phaser.process('{%= _.date("YYYY") %}');
      expect(actual.content).to.eql('2014');
    });

    it('should return the full date.', function () {
      var actual = phaser.process('{%= _.date("full") %}');
      expect(actual.content.indexOf(2014) !== -1).to.eql(true);
    });
  });
});
