'use strict';

var Schema = require('../lib/schema');
var schema = new Schema();

schema.field('data', ['object']);
schema.field('options', ['object']);
schema.field('plugins', ['array', 'object']);

schema.field('related', ['array', 'object'], {
  sort: function(a, b) {
    return a > b;
  }
});

schema.field('reflinks', ['array', 'object'], {
  validate: function(val, key, config) {

  }
});

schema.field('reflinks.list', ['array'], {
  validate: function(val, key, config) {
    return Array.isArray(val);
  },
  sort: ['foo', 'bar', 'baz']
});

schema.field('example', ['array'], {
  normalize: function(val, key, config) {
    return Array.isArray(val);
  },
  validate: function(val, key, config) {
    return true;
  },
  validate: function(val, key, config) {
    return new Status('foo')
  },
  sort: ['foo', 'bar', 'baz'],
  sort: function() {

  }
});

// console.log(schema.isValid('reflinks.list', ''))
// console.log(schema.isValid('whatever'))

var pkg = {
  verb: {
    reflinks: 'foo',
    related: {
      list: ['foo', 'bar', 'baz']
    },
  }
};

var results = schema.validate(pkg.verb);
// console.log(results)
