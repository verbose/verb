// node_modules
var expect = require('chai').expect;
var file = require('fs-utils');

// Local libs
var phaser = require('../');

// console.log(phaser.process('{%= name %}'));

describe('options.config', function () {

  describe('when the default config object is not overridden:', function () {
    it('should extend the context with data from package.json', function () {
      var actual = phaser.process();
      file.writeJSONSync('test/expected/context.json', actual);
      var expected = file.readJSONSync('test/expected/config-default.json');
      file.writeJSONSync('test/expected/expected.json', expected);
      expect(actual).to.eql(expected);
    });
  });

  // describe('when a custom config object is defined:', function () {
  //   it('should extend that data into the context, but not data from package.json', function () {
  //     var actual = phaser.process('', {
  //       config: {
  //         name: 'Custom Config'
  //       }
  //     });
  //     var expected = file.readJSONSync('test/expected/config-custom.json');
  //     expect(actual).to.eql(expected);
  //   });
  // });
});
