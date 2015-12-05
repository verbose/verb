'use strict';

var Verb = require('..');
var verb = new Verb();

var Scaffold = require('scaffold');
var scaffold = new Scaffold({
  a: {
    options: {
      cwd: 'examples/fixtures',
      destBase: 'two',
    },
    data: {name: 'Jon'},
    files: [
      {src: '*.txt', dest: 'a'},
      {src: '*.txt', dest: 'b'},
      {src: '*.txt', dest: 'c'},
      {src: '*.md', dest: 'md', data: {name: 'Jon'}},
    ]
  },
  b: {
    cwd: 'examples/fixtures',
    destBase: 'one',
    data: {name: 'Brian'},
    files: [
      {src: '*.txt', dest: 'a'},
      {src: '*.txt', dest: 'b'},
      {src: '*.txt', dest: 'c'},
      {src: '*.md', dest: 'md', data: {name: 'Brian'}},
    ]
  }
});

verb.scaffold(scaffold, function(err) {
  if (err) return console.log(err);
  console.log('done!');
});
