'use strict';

require('mocha');
require('should');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var Collection = App.Collection;
var Item = App.Item;
var collection;

describe('collection.use', function() {
  beforeEach(function() {
    collection = new Collection();
  });

  it('should expose the instance to `use`:', function(cb) {
    collection.use(function(inst) {
      assert(inst instanceof Collection);
      cb();
    });
  });

  it('should be chainable:', function(cb) {
    collection.use(function(inst) {
      assert(inst instanceof Collection);
    })
      .use(function(inst) {
        assert(inst instanceof Collection);
      })
      .use(function(inst) {
        assert(inst instanceof Collection);
        cb();
      });
  });

  it('should expose the collection to a plugin:', function() {
    collection.use(function(items) {
      assert(items instanceof Collection);
      items.foo = items.addItem.bind(items);
    });

    collection.foo('a', {content: '...'});
    assert(collection.items.hasOwnProperty('a'));
  });

  it('should expose collection when chained:', function() {
    collection
      .use(function(items) {
        assert(items instanceof Collection);
        items.foo = items.addItem.bind(items);
      })
      .use(function(items) {
        assert(items instanceof Collection);
        items.bar = items.addItem.bind(items);
      })
      .use(function(items) {
        assert(items instanceof Collection);
        items.baz = items.addItem.bind(items);
      });

    var pages = collection;

    pages.foo({path: 'a', content: '...'});
    pages.bar({path: 'b', content: '...'});
    pages.baz({path: 'c', content: '...'});

    assert(collection.items.hasOwnProperty('a'));
    assert(collection.items.hasOwnProperty('b'));
    assert(collection.items.hasOwnProperty('c'));
  });

  it('should work when a custom `Item` constructor is passed:', function() {
    collection = new Collection({Item: require('vinyl')});
    collection
      .use(function(items) {
        assert(items instanceof Collection);
        items.foo = items.addItem.bind(items);
      })
      .use(function(items) {
        assert(items instanceof Collection);
        items.bar = items.addItem.bind(items);
      })
      .use(function(items) {
        assert(items instanceof Collection);
        items.baz = items.addItem.bind(items);
      });

    var pages = collection;

    pages.foo({path: 'a', content: '...'});
    pages.bar({path: 'b', content: '...'});
    pages.baz({path: 'c', content: '...'});

    assert(collection.items.hasOwnProperty('a'));
    assert(collection.items.hasOwnProperty('b'));
    assert(collection.items.hasOwnProperty('c'));
  });

  it('should pass to item `use` if a function is returned:', function() {
    collection.use(function(items) {
      assert(items instanceof Collection);

      return function(item) {
        item.foo = items.addItem.bind(items);
        assert(item instanceof Item);
      };
    });

    collection.addItem('a', {content: '...'})
      .foo({path: 'b', content: '...'})
      .foo({path: 'c', content: '...'})
      .foo({path: 'd', content: '...'});

    assert(collection.items.hasOwnProperty('a'));
    assert(collection.items.hasOwnProperty('b'));
    assert(collection.items.hasOwnProperty('c'));
    assert(collection.items.hasOwnProperty('d'));
  });

  it('should be chainable when a item function is returned:', function() {
    collection
      .use(function(items) {
        assert(items instanceof Collection);

        return function(item) {
          item.foo = items.addItem.bind(items);
          assert(item instanceof Item);
        };
      })
      .use(function(items) {
        assert(items instanceof Collection);

        return function(item) {
          item.bar = items.addItem.bind(items);
          assert(item instanceof Item);
        };
      })
      .use(function(items) {
        assert(items instanceof Collection);

        return function(item) {
          item.baz = items.addItem.bind(items);
          assert(item instanceof Item);
        };
      });

    collection.addItem('a', {content: '...'})
      .foo({path: 'b', content: '...'})
      .bar({path: 'c', content: '...'})
      .baz({path: 'd', content: '...'});

    assert(collection.items.hasOwnProperty('a'));
    assert(collection.items.hasOwnProperty('b'));
    assert(collection.items.hasOwnProperty('c'));
    assert(collection.items.hasOwnProperty('d'));
  });
});

describe('app > collection .use', function() {
  var app;
  beforeEach(function() {
    app = new App();
  });

  it('should pass plugins down to collections', function(cb) {
    var count = 0;
    app.use(function(inst) {
      return function(collection) {
        count++;
      };
    });

    app.create('pages');
    assert.equal(count, 1);
    cb();
  });

  it('should pass plugins down to collections after a collection is created', function(cb) {
    var count = 0;
    app.create('pages');

    app.use(function(inst) {
      return function(collection) {
        count++;
      };
    });

    assert.equal(count, 1);
    cb();
  });

  it('should pass plugins down to every collections', function(cb) {
    var count = 0;
    app.create('pages');
    app.create('posts');
    app.create('docs');

    app.use(function(inst) {
      return function(collection) {
        count++;
      };
    });

    assert.equal(count, 3);
    cb();
  });

  it('should pass plugins all the way down to views', function(cb) {
    var count = {pages: 0, posts: 0};

    app.create('pages');
    app.create('posts');

    app.pages.addView('foo', {content: 'this is content'});
    app.pages.addView('bar', {content: 'this is content'});
    app.pages.addView('baz', {content: 'this is content'});

    app.posts.addView('foo', {content: 'this is content'});
    app.posts.addView('bar', {content: 'this is content'});
    app.posts.addView('baz', {content: 'this is content'});

    // add plugin after adding views and collections
    app.use(function(inst) {
      return function(collection) {
        var name = collection.options.plural;
        return function(view) {
          count[name]++;
          view.count = count[name];
        };
      };
    });

    assert.equal(app.pages.getView('foo').count, 1);
    assert.equal(app.pages.getView('bar').count, 2);
    assert.equal(app.pages.getView('baz').count, 3);
    assert.equal(count.pages, 3);

    assert.equal(app.posts.getView('foo').count, 1);
    assert.equal(app.posts.getView('bar').count, 2);
    assert.equal(app.posts.getView('baz').count, 3);
    assert.equal(count.posts, 3);
    cb();
  });
});
