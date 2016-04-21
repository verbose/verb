'use strict';

module.exports = function(app) {
  app.extendWith('verb-readme-generator');
  app.helper('example', require('helper-example'));
  app.task('default', ['readme']);
};
