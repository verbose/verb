/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';


// Node.js
var path = require('path');

// node_modules
var expect = require('chai').expect;
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var phaser = require('../');

describe('process:', function () {
  it('should return the value of the name field in package.json', function () {
    var actual = phaser.process('{%= name %}');
    var expected = 'phaser';
    expect(actual).to.eql(expected);
  });

  it('should change the name of the project to a custom value.', function () {
    var actual = phaser.process('{%= name %}', {name: "foo"});
    var expected = 'foo';
    expect(actual).to.eql(expected);
  });

  it('should return the author name.', function () {
    var actual = phaser.process('{%= author.name %}');
    var expected = 'Jon Schlinkert';
    expect(actual).to.eql(expected);
  });
});


describe('process files:', function () {
  it('should read the file, process templates therein, and return the author name.', function () {
    var fixture = 'test/fixtures/author.tmpl';
    var actual = phaser.processFileSync(fixture);
    var expected = 'Jon Schlinkert';
    expect(actual).to.eql(expected);
  });

  it('should read the file, process templates therein, and return the project name.', function () {
    var fixture = 'test/fixtures/name.tmpl';
    var actual = phaser.processFileSync(fixture);
    var expected = 'phaser';
    expect(actual).to.eql(expected);
  });
});


// describe('meta.authors:', function () {
//   it('should return the name of the first author from the AUTHORS file.', function () {
//     var actual = phaser('{%= authors[0].name %}');
//     var expected = 'Jon Schlinkert';
//     expect(actual).to.eql(expected);
//   });
// });


// describe('meta.contributors:', function () {
//   it('should return the name of the first contributor listed.', function () {
//     var actual = phaser('{%= contributors[0].name %}');
//     var expected = 'Jon Schlinkert';
//     expect(actual).to.eql(expected);
//   });
// });


// describe('_.contributors:', function () {
//   it('should return the name of the contributors using a mixin.', function () {
//     var actual = phaser('{%= _.contributors() %}');
//     var expected = '* Jon Schlinkert\n* Brian Woodward';
//     expect(actual).to.eql(expected);
//   });
// });


// describe('meta.date:', function () {
//   it('should return the current year.', function () {
//     var actual = phaser('{%= _.date("YYYY") %}');
//     var expected = '2014';
//     expect(actual).to.eql(expected);
//   });

//   it('should return the full date.', function () {
//     var actual = phaser('{%= _.date("full") %}');
//     expect(actual.indexOf(2014) !== -1).to.eql(true);
//   });
// });


// describe('meta.homepage:', function () {
//   it('should return a normalized version of the homepage URL listed in package.json.', function () {
//     var actual = phaser('{%= homepage %}');
//     var expected = 'https://github.com/jonschlinkert/phaser';
//     expect(actual).to.eql(expected);
//   });

//   it('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
//     var actual = phaser('{%= homepage %}', {metadata: {homepage: 'git://github.com/foo/bar'}});
//     var expected = 'https://github.com/foo/bar';
//     expect(actual).to.eql(expected);
//   });

//   it('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
//     var actual = phaser('{%= homepage %}', {metadata: {homepage: 'git://github.com/baz/quux/'}});
//     var expected = 'https://github.com/baz/quux/';
//     expect(actual).to.eql(expected);
//   });

//   it('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
//     var actual = phaser('{%= _.homepage() %}');
//     var expected = 'https://github.com/jonschlinkert/phaser';
//     expect(actual).to.eql(expected);
//   });
// });


// describe('process template mixins:', function () {

//   it('should return the authors from the config or the "AUTHORS" file.', function () {
//     var tmpl = '{% _.each(authors, function(author) { %} + [{%= author.name %}]({%= author.url %})\n {% }); %}';
//     var actual = phaser(tmpl);
//     var expected = '+ [Jon Schlinkert](https://github.com/jonschlinkert)\n  + [Brian Woodward](https://github.com/doowb)\n ';
//     expect(actual).to.eql(expected);
//   });

//   it('should return the names of the authors from config or the "AUTHORS" file.', function () {
//     var actual = phaser('{%= _.authors("name") %}');
//     var expected = 'Jon Schlinkert,Brian Woodward';
//     expect(actual).to.eql(expected);
//   });

//   it('should pluck the names of the authors from the config or the "AUTHORS" file.', function () {
//     var actual = phaser('{%= _.pluck(authors, "name") %}');
//     var expected = 'Jon Schlinkert,Brian Woodward';
//     expect(actual).to.eql(expected);
//   });
// });



// describe('process templates using _.template:', function () {
//   it('should process a template with default delimiters.', function () {
//     var compiled = _.template('hello <%= name %>');
//     compiled({ 'name': 'fred' });

//     var actual = compiled({ 'name': 'fred' });
//     expect(actual).to.eql('hello fred');
//   });

//   it('should process a template with es6 delimiters.', function () {
//     var compiled = _.template('hello ${ name }');
//     compiled({ 'name': 'fred' });

//     var actual = compiled({ 'name': 'fred' });
//     expect(actual).to.eql('hello fred');
//   });
// });