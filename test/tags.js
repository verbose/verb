var util = require('util');
var file = require('fs-utils');
var expect = require('chai').expect;
var phaser = require('../');


describe('Tags', function () {


  describe('moment:', function () {
    it('should return the current year with four digits.', function () {
      var actual = phaser.process('{%= moment("YYYY") %}');
      expect(actual.content).to.eql(String(new Date().getFullYear()));
    });

    it('should return the current year with two digits.', function () {
      var actual = phaser.process('{%= moment("YY") %}');
      expect(actual.content).to.eql(String(new Date().getFullYear()).substring(2));
    });

    it('should validate the given arguments.', function () {
      var actual = phaser.process('{%= moment(2014, "YYYY").isValid() %}');
      expect(actual.content).to.eql('true');
    });
  });

  describe('date related (non-moment):', function () {
    it('should validate the given arguments.', function () {
      var actual = phaser.process('{%= year() %}');
      expect(actual.content).to.eql(String(new Date().getFullYear()));
    });
  });


  // no-op. this is a visual test for simplicity
  describe('log:', function () {
    it('should log a message in the console.', function () {
      var actual = phaser.process('{%= log("Name:", name) %}');
      expect().to.eql(phaser.log.warn("Name:", 'phaser'));
    });
  });
});