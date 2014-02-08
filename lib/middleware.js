var Adjunct = require('adjunct');
var _ = require('lodash');
var glob = require('globule');
var path = require('path');


var core = glob.find('lib/middleware/*.js');
var extensions = core.map(function(ea) {
  return require(path.resolve(ea));
});



var data = {
  key: 'value',
  nested: {
    key: 'value-nested'
  }
};

var middlewares = [];

_.forEach(extensions, function(extension) {
  middlewares.push(extension);
});

var config = new Adjunct(data, middlewares);

// shorthand getter/setter method
config('key'); // [eulav]
config('key','changedValue');

// api methods
config.get('key'); // [eulaVdegnahc]
config.get('nested.key'); // [detsen-eulav]
config.getRaw('key'); // changedValue
config.getRaw('nested.key'); // value-nested
config.set('key', 'hi'); // hi
console.log(extensions);
console.log(config);