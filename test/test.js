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


/**
 * phaser.process()
 */

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


/**
 * phaser.read()
 */

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


/**
 * options.data
 */

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
 * options.data (minimatch)
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


/**
 * Coffee Front Matter
 */

describe('Coffee front-matter:', function () {
  it('should extend the context with data from Coffee Front matter.', function () {
    var fixture = 'test/fixtures/matter-coffee.md';
    var actual = phaser.read(fixture);
    var expected = 'Coffee Front Matter';
    expect(actual).to.eql(expected);
  });

  it('should parse coffee front matter.', function (done) {
    var fixture = file.readFileSync('test/fixtures/coffee.md');
    var actual = phaser(fixture, {lang: 'coffee'}).content;
    expect(actual).to.deep.equal('Coffee Front Matter');
    done();
  });

  it('should evaluate functions in coffee front matter.', function (done) {
    var fixture = file.readFileSync('test/fixtures/coffee-fn.md');
    var actual = phaser(fixture);
    expect(actual.content).to.equal('jonschlinkert\ntreknilhcsnoj');
    done();
  });
});


/**
 * Front matter: language detection
 */

describe('autodetect language', function () {
  it('should detect JSON as the language defined.', function (done) {
    var fixture = file.readFileSync('./test/fixtures/autodetect-json.md');
    var actual = phaser(fixture, {matter: {delims: [';;;', ';;;']}});
    expect(actual.content).to.deep.equal('JSON Front Matter');
    done();
  });

  it('should detect CoffeeScript as the language.', function (done) {
    var fixture = file.readFileSync('./test/fixtures/autodetect.md');
    var actual = phaser(fixture, {config: false});
    expect(actual.content).to.deep.equal('jonschlinkert');
    done();
  });

  it('should detect YAML as the language, although no language is defined after the first fence.', function (done) {
    var fixture = file.readFileSync('./test/fixtures/autodetect-no-lang.md');
    var actual = phaser(fixture, {config: false});
    var expected = file.readJSONSync('test/expected/autodetect-no-lang.json');
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should detect YAML as the language.', function (done) {
    var fixture = file.readFileSync('./test/fixtures/autodetect-yaml.md');
    var actual = phaser(fixture, {config: false});
    var expected = file.readJSONSync('test/expected/autodetect-yaml.json');
    expect(actual).to.deep.equal(expected);
    done();
  });
});


/**
 * Mixins: date
 */

describe('mixins.date:', function () {
  it('should return the current year.', function () {
    var actual = phaser('{%= _.date("YYYY") %}');
    expect(actual.content).to.eql('2014');
  });

  it('should return the full date.', function () {
    var actual = phaser('{%= _.date("full") %}');
    expect(actual.content.indexOf(2014) !== -1).to.eql(true);
  });
});



/**
 * Mixins:author
 */

describe('meta.authors:', function () {
  it.skip('should return the name of the first author from the AUTHORS file.', function () {
    var actual = phaser('{%= authors[0].name %}');
    var expected = 'Jon Schlinkert';
    expect(actual).to.eql(expected);
  });
});



/**
 * Mixins: contributors
 */

describe('meta.contributors:', function () {
  it.skip('should return the name of the first contributor listed.', function () {
    var actual = phaser('{%= contributors[0].name %}');
    var expected = 'Jon Schlinkert';
    expect(actual).to.eql(expected);
  });
});


describe('_.contributors:', function () {
  it.skip('should return the name of the contributors using a mixin.', function () {
    var actual = phaser('{%= _.contributors() %}');
    var expected = '* Jon Schlinkert\n* Brian Woodward';
    expect(actual).to.eql(expected);
  });
});


describe('meta.homepage:', function () {
  it.skip('should return a normalized version of the homepage URL listed in package.json.', function () {
    var actual = phaser('{%= homepage %}');
    var expected = 'https://github.com/jonschlinkert/phaser';
    expect(actual).to.eql(expected);
  });

  it.skip('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
    var actual = phaser('{%= homepage %}', {metadata: {homepage: 'git://github.com/foo/bar'}});
    var expected = 'https://github.com/foo/bar';
    expect(actual).to.eql(expected);
  });

  it.skip('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
    var actual = phaser('{%= homepage %}', {metadata: {homepage: 'git://github.com/baz/quux/'}});
    var expected = 'https://github.com/baz/quux/';
    expect(actual).to.eql(expected);
  });

  it.skip('should return a normalized version of the custom homepage URL passed in through the metadata property.', function () {
    var actual = phaser('{%= _.homepage() %}');
    var expected = 'https://github.com/jonschlinkert/phaser';
    expect(actual).to.eql(expected);
  });
});


describe('process template mixins:', function () {
  it.skip('should return the authors from the config or the "AUTHORS" file.', function () {
    var tmpl = '{% _.each(authors, function(author) { %} + [{%= author.name %}]({%= author.url %})\n {% }); %}';
    var actual = phaser(tmpl);
    var expected = '+ [Jon Schlinkert](https://github.com/jonschlinkert)\n  + [Brian Woodward](https://github.com/doowb)\n ';
    expect(actual).to.eql(expected);
  });

  it.skip('should return the names of the authors from config or the "AUTHORS" file.', function () {
    var actual = phaser('{%= _.authors("name") %}');
    var expected = 'Jon Schlinkert,Brian Woodward';
    expect(actual).to.eql(expected);
  });

  it.skip('should pluck the names of the authors from the config or the "AUTHORS" file.', function () {
    var actual = phaser('{%= _.pluck(authors, "name") %}');
    var expected = 'Jon Schlinkert,Brian Woodward';
    expect(actual).to.eql(expected);
  });
});