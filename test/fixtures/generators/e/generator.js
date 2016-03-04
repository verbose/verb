'use strict';

/**
 * testing...
 */

module.exports = function(app, base, env) {
  app.task('default', function(cb) {
    console.log('e > default');
    cb();
  });
  app.task('one', function(cb) {
    console.log('e > one');
    cb();
  });
  app.task('two', function(cb) {
    console.log('e > two');
    cb();
  });

  // console.log(app)
  app.task('three', function(cb) {
    base.data({title: 'three'});
    base.build('readme', cb);
  });

  app.register('eee', '../c');

  app.register('e_docs', function(docs) {
    docs.task('e_x', function(cb) {
      console.log('e > x');
      cb();
    });
    docs.task('e_y', function(cb) {
      console.log('e > y');
      cb();
    });
    docs.task('e_z', function(cb) {
      console.log('e > z');
      cb();
    });
  });
};
