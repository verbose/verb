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

    // file.writeDataSync('test/expected/globbed-basic.json', actual);

/**
 * Vanilla Lo-Dash, for comparison.
 */

describe('process templates using _.template:', function () {
  it('should process a template with default delimiters.', function () {
    var compiled = _.template('hello <%= name %>');
    compiled({ 'name': 'fred' });
    var actual = compiled({ 'name': 'fred' });
    expect(actual).to.eql('hello fred');
  });

  it('should process a template with es6 delimiters.', function () {
    var compiled = _.template('hello ${ name }');
    compiled({ 'name': 'fred' });
    var actual = compiled({ 'name': 'fred' });
    expect(actual).to.eql('hello fred');
  });
});


/**
 * Begin Phaser tests.
 */


describe('config:', function () {
  it('should use the project\'s package.json file as the default config object (passed as context to templates)', function () {
    var actual = phaser('');
    var expected = file.readJSONSync('test/expected/config-default.json');
    expect(actual).to.eql(expected);
  });

  it('should use a custom config object (to pass as context to templates)', function () {
    var actual = phaser('', {config: {name: 'Custom Config'}});
    var expected = file.readJSONSync('test/expected/config-custom.json');
    expect(actual).to.eql(expected);
  });
});


/**
 * phaser()
 */

describe('phaser:', function () {
  it('should return the value of the name field in package.json', function () {
    var actual = phaser('{%= name %}').content;
    var expected = 'phaser';
    expect(actual).to.eql(expected);
  });

  it('should change the name of the project to a custom value from the root context.', function () {
    var actual = phaser('{%= name %}', {name: "foo"}).content;
    var expected = 'foo';
    expect(actual).to.eql(expected);
  });

  it('should change the name of the project to a custom value from the data object.', function () {
    var actual = phaser('{%= name %}', {data: {name: "foo"}}).content;
    var expected = 'foo';
    expect(actual).to.eql(expected);
  });

  it('should return the author name.', function () {
    var actual = phaser('{%= author.name %}').content;
    var expected = 'Jon Schlinkert';
    expect(actual).to.eql(expected);
  });
});

describe('phaser.process:', function () {
  it('should return the value of the name field in package.json', function () {
    var actual = phaser.process('{%= name %}');
    var expected = 'phaser';
    expect(actual).to.eql(expected);
  });

  it('should change the name of the project to a custom value from the root context.', function () {
    var actual = phaser.process('{%= name %}', {name: "foo"});
    var expected = 'foo';
    expect(actual).to.eql(expected);
  });
  it('should change the name of the project to a custom value from the data object.', function () {
    var actual = phaser.process('{%= name %}', {data: {name: "foo"}});
    var expected = 'foo';
    expect(actual).to.eql(expected);
  });

  it('should return the author name.', function () {
    var actual = phaser.process('{%= author.name %}');
    var expected = 'Jon Schlinkert';
    expect(actual).to.eql(expected);
  });
});


describe('phaser.read:', function () {
  it('should read the file, process templates therein, and return the author name.', function () {
    var fixture = 'test/fixtures/author.tmpl';
    var actual = phaser.read(fixture);
    var expected = 'Jon Schlinkert';
    expect(actual).to.eql(expected);
  });

  it('should read the file, process templates therein, and return the project name.', function () {
    var fixture = 'test/fixtures/name.tmpl';
    var actual = phaser.read(fixture);
    var expected = 'phaser';
    expect(actual).to.eql(expected);
  });
});


describe('options.data (raw object):', function () {
  it('should extend the context with data from options (root context).', function () {
    var fixture = 'test/fixtures/author.tmpl';
    var actual = phaser.read(fixture, {author: {name: "Brian Woodward"}});
    var expected = 'Brian Woodward';
    expect(actual).to.eql(expected);
  });

  it('should extend the context with data from options.data.', function () {
    var fixture = 'test/fixtures/author.tmpl';
    var actual = phaser.read(fixture, {data: {author: {name: "Brian Woodward"}}});
    var expected = 'Brian Woodward';
    expect(actual).to.eql(expected);
  });
});


describe('options.data (string):', function () {
  it('should extend the context with the "name", which IS namespaced, and is from a file that is read-in', function () {
    var fixture = 'test/fixtures/author.tmpl';
    var actual = phaser.read(fixture, {data: 'test/fixtures/data/author.json', namespace: true});
    var expected = 'Brian Woodward';
    expect(actual).to.eql(expected);
  });

  it('should extend the context with the "name", which is NOT namespaced, and is from a file that is read-in', function () {
    var fixture = 'test/fixtures/name.tmpl';
    var actual = phaser.read(fixture, {data: 'test/fixtures/data/author.json', namespace: false});
    var expected = 'Brian Woodward';
    expect(actual).to.eql(expected);
  });
});


/**
 * Globbing
 */

describe('options.data (glob):', function () {
  it('should extend the context with the "name", which is NOT namespaced, and is from a file that is globbed.', function () {
    var fixture = 'test/fixtures/name.tmpl';
    var actual = phaser.read(fixture, {data: 'test/fixtures/**/author.json', namespace: false});
    var expected = 'Brian Woodward';
    expect(actual).to.eql(expected);
  });

  it('should extend the context with data from globbed files.', function () {
    var fixture = file.readFileSync('test/fixtures/name.tmpl');
    var actual = phaser(fixture, {data: 'test/fixtures/data/*.json'});
    var expected = file.readJSONSync('test/expected/globbed-basic.json');
    expect(actual).to.eql(expected);
  });

  it('should extend the context with data from an array of globbed files.', function () {
    var fixture = file.readFileSync('test/fixtures/name.tmpl');
    var actual = phaser(fixture, {data: ['test/fixtures/**/foo.json', 'test/fixtures/data/{a,b}*.json']});
    var expected = file.readJSONSync('test/expected/globbed-array.json');
    expect(actual).to.eql(expected);
  });
});


/**
 * Front matter
 */

describe('front-matter:', function () {
  it('should extend the context with data from options.data.', function () {
    var fixture = 'test/fixtures/matter.md';
    var actual = phaser.read(fixture);
    var expected = 'Matter';
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