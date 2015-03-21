/*!
 * verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var verb = require('..');
require('should');

describe('engine create:', function () {
  beforeEach(function (done) {
    verb = new verb.Verb();
    verb.engine('*', require('engine-lodash'));
    done();
  });

  describe('.create():', function () {
    it('should create a new template `type`:', function () {
      verb.create('include', 'includes');
      verb.should.have.properties('include', 'includes');
    });
  });

  describe('when a new template type is created:', function () {
    it('should add methods to the views for that type:', function () {
      verb.create('apple', 'apples');
      verb.should.have.properties('apple', 'apples');
    });

    it('should add templates to the views for a given template type:', function () {
      verb.create('apple', 'apples');

      verb.apple('a', 'one');
      verb.apple('b', 'two');
      verb.apple('c', 'three');

      verb.views.should.have.property('apples');
      verb.views.apples.should.have.properties('a', 'b', 'c');
    });

    describe('.decorate()', function () {

      /* setup */

      beforeEach(function () {
        verb = new verb.Verb();

        // create some custom template types
        verb.create('block', 'blocks', { isLayout: true });
        verb.create('include', 'includes', { isPartial: true });
        verb.create('post', 'posts', { isRenderable: true });
        verb.create('doc', 'docs', { isRenderable: true });

        // intentionally create dupes using different renderable types
        verb.page('aaa.md', '<%= name %>', {name: 'Jon Schlinkert'});
        verb.post('aaa.md', '<%= name %>', {name: 'Brian Woodward'});
        verb.docs('aaa.md', '<%= name %>', {name: 'Halle Nicole'});

        verb.include('sidebar.md', '<nav>sidebar</nav>');
        verb.block('default.md', 'abc {% body %} xyz');
      });

      /* tests */

      it('should decorate the type with a `get` method:', function () {
        verb.should.have.properties(['getPage', 'getPost', 'getDoc', 'getInclude']);
      });

      it('should decorate the type with a `render` method:', function () {
        verb.should.have.properties(['renderPage', 'renderPost', 'renderDoc']);
      });
    });
  });

  describe('when the `isRenderable` flag is set on the options:', function () {
    it('should push the name of the type into the `isRenderable` array:', function () {
      verb.create('apple', 'apples', { isRenderable: true });

      verb.type.renderable.should.containEql('pages');
      verb.type.renderable.should.containEql('apples');
      verb.type.renderable.should.containEql('apples');
    });
  });

  describe('when the `isLayout` flag is set on the options:', function () {
    it('should push the name of the type into the `isLayout` array:', function () {
      verb.create('orange', 'oranges', { isLayout: true });

      verb.type.layout.should.containEql('layouts');
      verb.type.layout.should.containEql('oranges');
    });
  });

  describe('when no type flag is set on the options:', function () {
    it('should push the name of the type into the `isPartial` array:', function () {
      verb.create('banana', 'bananas');

      verb.type.partial.should.containEql('partials');
      verb.type.partial.should.containEql('bananas');
    });
  });

  describe('when the `isPartial` flag is set on the options:', function () {
    it('should push the name of the type into the `isPartial` array:', function () {
      verb.create('banana', 'bananas', { isPartial: true });

      verb.type.partial.should.containEql('partials');
      verb.type.partial.should.containEql('bananas');
    });
  });

  describe('when both the `isPartial` and the `isLayout` flags are set:', function () {
    it('should push the type into both arrays:', function () {
      verb.create('banana', 'bananas', { isPartial: true, isLayout: true });

      verb.type.partial.should.containEql('bananas');
      verb.type.layout.should.containEql('bananas');
    });
  });

  describe('when both the `isPartial` and the `isRenderable` flags are set:', function () {
    it('should push the type into both arrays:', function () {
      verb.create('banana', 'bananas', { isPartial: true, isRenderable: true });

      verb.type.partial.should.containEql('bananas');
      verb.type.renderable.should.containEql('bananas');
    });
  });

  describe('when both the `isLayout` and the `isRenderable` flags are set:', function () {
    it('should push the type into both arrays:', function () {
      verb.create('banana', 'bananas', { isLayout: true, isRenderable: true });

      verb.type.layout.should.containEql('bananas');
      verb.type.renderable.should.containEql('bananas');
    });
  });

  describe('when all three types flags are set:', function () {
    it('should push the type into all three arrays:', function () {
      verb.create('banana', 'bananas', { isPartial: true, isLayout: true, isRenderable: true });

      verb.type.layout.should.containEql('bananas');
      verb.type.partial.should.containEql('bananas');
      verb.type.renderable.should.containEql('bananas');
    });
  });
});
