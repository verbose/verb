'use strict';

var extend = require('extend-shallow');

module.exports = function(verb) {
  verb.extendWith('verb-generate-readme');

  verb.helper('foo', function(name, locals) {
    var ctx = extend({}, this.context, locals);
  });

  verb.task('default', ['readme']);
};
