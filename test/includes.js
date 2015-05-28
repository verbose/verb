/*!
 * verb <https://github.com/verbose/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('includes', function () {
  describe('when the author include is used:', function () {
    beforeEach(function (done) {
      verb = new verb.Verb();
      verb.engine('*', require('engine-lodash'));
      done();
    });

    it('should render only the name when `username` is not defined:', function (done) {
      verb.render('{%= include("author") %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal([
          '',
          '**Jon Schlinkert**',
          ''
        ].join('\n'));
        done();
      });
    });

    it('should render github and twitter url when `username` is passed:', function (done) {
      verb.render('{%= include("author", {username: "jonschlinkert"}) %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal([
          '',
          '**Jon Schlinkert**',
          '',
          ' + [github/jonschlinkert](https://github.com/jonschlinkert) ',
          ' + [twitter/jonschlinkert](http://twitter.com/jonschlinkert) ',
          ''
        ].join('\n'));
        done();
      });
    });

    it('should render github url only when `author.username` is passed:', function (done) {
      verb.render('{%= include("author", {author: {username: "jonschlinkert"}}) %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal([
          '',
          '**Jon Schlinkert**',
          '',
          ' + [github/jonschlinkert](https://github.com/jonschlinkert) ',
          ''
        ].join('\n'));
        done();
      });
    });

    it('should render twitter url only when `author.username` is passed:', function (done) {
      verb.render('{%= include("author", {twitter: {username: "jonschlinkert"}}) %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal([
          '',
          '**Jon Schlinkert**',
          ' + [twitter/jonschlinkert](http://twitter.com/jonschlinkert) ',
          ''
        ].join('\n'));
        done();
      });
    });

    it('should render github and twitter urls when `author.username` is passed:', function (done) {
      verb.render('{%= include("author", {author: {username: "jonschlinkert"}}) %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal([
          '',
          '**Jon Schlinkert**',
          '',
          ' + [github/jonschlinkert](https://github.com/jonschlinkert) \n',
        ].join('\n'));
        done();
      });
    });

    it('should work when `username` is on the context:', function (done) {
      verb.data({username: 'jonschlinkert'});

      verb.render('{%= include("author") %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal([
          '',
          '**Jon Schlinkert**',
          '',
          ' + [github/jonschlinkert](https://github.com/jonschlinkert) ',
          ' + [twitter/jonschlinkert](http://twitter.com/jonschlinkert) ',
          ''
        ].join('\n'));
        done();
      });
    });

    it('should work when `username` is defined in front-matter:', function (done) {
      verb.doc('foo.md', {content: '---\nusername: jonschlinkert\n---\n{%= include("author") %}'});
      verb.render('foo', function (err, content) {
        console.log(verb.cache)
        if (err) console.log(err);
        content.should.equal([
          '',
          '**Jon Schlinkert**',
          '',
          ' + [github/jonschlinkert](https://github.com/jonschlinkert) ',
          ' + [twitter/jonschlinkert](http://twitter.com/jonschlinkert) ',
          ''
        ].join('\n'));
        done();
      });
    });
  });
});
