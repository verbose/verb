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
});
