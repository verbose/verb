var util = require('util');
var file = require('fs-utils');
var expect = require('chai').expect;
var phaser = require('../');


describe('Tags', function () {
  var year = new Date().getFullYear();

  describe('date:', function () {
    it('should return the current year with four digits.', function () {
      var actual = phaser.process('{%= date("YYYY") %}');
      expect(actual.content).to.eql(String(year));
    });

    it('should return the current year with two digits.', function () {
      var actual = phaser.process('{%= date("YY") %}');
      expect(actual.content).to.eql(String(year).substring(2));
    });

    it('should validate the given arguments.', function () {
      var actual = phaser.process('{%= date() %}');
      expect(actual.content.indexOf(year) !== -1).to.eql(true);
    });
  });

  describe('year:', function () {
    it('should validate the given arguments.', function () {
      var actual = phaser.process('{%= year() %}');
      expect(actual.content).to.eql(String(year));
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