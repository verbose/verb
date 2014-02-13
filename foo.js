var _ = require('lodash');


var foo = {
  a: 'a'
};

var bar = {
  a: 'b',
  b: 'b'
};

_.extend(foo, bar);


console.log(foo);
