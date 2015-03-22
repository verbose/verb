/*!
 * verb <https://github.com/assemble/verb>
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
    done();
  });

  describe('`.data()` method:', function () {
    it('should store data on `verb.cache.data`:', function () {
      verb.data({name: 'Halle'});
      verb.cache.data.name.should.equal('Halle');
    });

    it('should pass be passed to templates as context:', function (done) {
      verb.data({name: 'Halle'});
      verb.render('{%= name %}', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Halle');
        done();
      });
    });

    it('should be overridden by data passed on the render method:', function (done) {
      verb.data({name: 'Halle'});
      verb.render('{%= name %}', {name: 'Brooke'}, function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brooke');
        done();
      });
    });

    it('should be overridden by data passed on template locals:', function (done) {
      verb.data({name: 'Halle'});
      verb.doc('foo.md', {content: '{%= name %}', locals: {name: 'Brooke'}});

      verb.render('foo', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brooke');
        done();
      });
    });

    it('should be overridden by data passed on template data:', function (done) {
      verb.data({name: 'Halle'});
      verb.doc('foo.md', {content: '{%= name %}', data: {name: 'Brooke'}});

      verb.render('foo', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brooke');
        done();
      });
    });

    it('should be overridden by data passed on front-matter:', function (done) {
      verb.data({name: 'Halle'});
      verb.doc('foo.md', {content: '---\nname: Brooke\n---\n{%= name %}'});

      verb.render('foo', function (err, content) {
        if (err) console.log(err);
        content.should.equal('Brooke');
        done();
      });
    });
  });
});
