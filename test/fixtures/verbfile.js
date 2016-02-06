'use strict';

module.exports = function(app) {
  app.register('generate-aaa', function(app) {
    app.task('default', function(cb) {
      console.log('generate > default');
      cb();
    });

    app.register('sub', function(sub) {
      sub.task('default', function(cb) {
        console.log('aaa > sub > default');
        cb();
      });

      sub.register('bbb', function(bbb) {
        bbb.task('default', function(cb) {
          console.log('aaa > sub > bbb > default');
          cb();
        });
      });
    });
  });

  app.register('generate-abc', 'test/fixtures/generators/a/generator.js');

  app.register('generate-bbb', function(app) {
    app.task('default', function(cb) {
      app.generate('aaa.sub.bbb', 'default', cb);
    });
  });

  app.register('generate-ccc', function(app) {
    app.task('default', function(cb) {
      app.generate('abc', 'default', cb);
    });
  });

  app.register('generate-ddd', function(app) {
    app.task('default', function(cb) {
      app.generate('abc.docs', 'x', cb);
    });
  });

  app.generate('aaa.sub', ['default'], function(err) {
    if (err) throw err;
    console.log('done');
  });
};
