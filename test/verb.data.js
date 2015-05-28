/*!
 * verb <https://github.com/verbose/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('verb.data()', function () {
  beforeEach(function (done) {
    verb = new verb.Verb();
    verb.engine('*', require('engine-lodash'));
    verb.data({name: 'Halle'});
    verb.emit('loaded');
    done();
  });

  describe('`.data()` method:', function () {
    it('should store data on `verb.cache.data`:', function () {
      verb.cache.data.name.should.equal('Halle');
    });

    it('should pass be passed to templates as context:', function (done) {
      verb.render('<%= name %>', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Halle');
        done();
      });
    });

    it('should be overridden by data passed on the render method:', function (done) {
      verb.render('<%= name %>', {name: 'Brooke'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brooke');
        done();
      });
    });

    it.only('should be overridden by data passed on template locals:', function (done) {
      verb.data({name: 'Halle'});      
      verb.doc('foo.md', {content: '<%= name %>', locals: {name: 'Brooke'}});

      verb.render('foo', function (err, content) {
        if (err) console.log(err);
        // content.should.equal('Brooke');
        done();
      });
    });

    it('should be overridden by data passed on template data:', function (done) {
      verb.doc('foo.md', {content: '<%= name %>', data: {name: 'Brooke'}});

      verb.render('foo', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brooke');
        done();
      });
    });

    it('should be overridden by data passed on front-matter:', function (done) {
      verb.doc('foo.md', {content: '---\nname: Brooke\n---\n{%= name %}'});
      verb.render('foo', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brooke');
        done();
      });
    });
  });
});


describe('verb data', function() {
  beforeEach(function (done) {
    verb = new verb.Verb();
    done();
  });


  describe('.data()', function() {
    it('should set properties on the `data` object.', function() {
      verb.set('data.foo', 'bar');
      verb.get('data').foo.should.equal('bar');
      verb.get('data.foo').should.equal('bar');
    });

    it('should read files and merge data onto `cache.data`', function() {
      verb.data('package.json', { namespace: false });
      verb.get('data.name').should.equal('verb');
    });

    it('should read files and merge data onto `cache.data.package`', function() {
      verb.data('package.json', { namespace: true });
      verb.get('data.package.name').should.equal('verb');
    });

    it('should read files and merge data onto `cache.data`', function() {
      verb.data({xyz: 'abc'});
      verb.get('data.xyz').should.equal('abc');
    });

    it('should read files and merge data onto `cache.data`', function() {
      verb.data([{aaa: 'bbb', ccc: 'ddd'}]);
      verb.get('data.aaa').should.equal('bbb');
      verb.get('data.ccc').should.equal('ddd');
    });
  });

  describe('.extendData()', function() {
    it('should extend the `data` object.', function() {
      verb.extendData({x: 'x', y: 'y', z: 'z'});
      verb.get('data').should.have.property('x');
      verb.get('data').should.have.property('y');
      verb.get('data').should.have.property('z');
    });
  });

  describe('.flattenData()', function() {
    it('should merge the value of a nested `data` property onto the root of the given object.', function() {
      var root = verb.flattenData({data: {x: 'x'}, y: 'y', z: 'z'});
      root.should.have.property('x');
      root.should.have.property('y');
      root.should.have.property('z');
      root.should.not.have.property('data');
    });
  });

  describe('.plasma()', function() {
    it('should read JSON files and return an object.', function() {
      var pkg = verb.plasma('package.json', { namespace: false });
      pkg.name.should.equal('verb');
    });

    it('should expand a glob pattern, read JSON/YAML files and return an object.', function() {
      var pkg = verb.plasma('p*.json', { namespace: false });
      pkg.name.should.equal('verb');
    });

    it('should accept and object and return an object.', function() {
      var foo = verb.plasma({a: 'b'});
      foo.a.should.equal('b');
    });
  });
});
