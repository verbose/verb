---
layout: false
---
'use strict';

module.exports = function(verb) {
  verb.use(require('verb-generate-readme'));
  verb.helper('foo', function(str) {
    return str;
  });
  verb.task('default', ['readme']);
};
