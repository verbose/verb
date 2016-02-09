'use strict';

module.exports = function custom(app) {
  app.task('foo', function(cb) {
    console.log('verb > verbfile >', this.name, 'task');
    cb();
  });
};
