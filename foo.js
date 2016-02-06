'use strict';

var Verb = require('./');
var verb = new Verb();

var opts = { dot: true };

verb.conflicts('lib/generators/templates/*', opts, function(err, views) {
  console.log(views)
});
