// 'use strict';

// var combined = require('stream-combiner');
// var filter = require('filter-views');

// module.exports = function(verb, base) {
//   var toStream = combine(verb, ['foo', 'bar', 'baz']);

//   verb.task('files', function() {
//     return toStream('docs', filter('*.qux'))
//       .pipe(verb.dest('.'))
//   });
// }

// function combine(app, generators) {
//   return function(names, filter) {
//     app.compose(generators).views(names, filter);
//     var streams = [];

//     if (typeof names === 'string') {
//       names = [names];
//     }

//     names.forEach(function(name) {
//       streams.push(app.toStream(name));
//     });
//     return combined(streams);
//   };
// }
