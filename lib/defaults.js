'use strict';

var utils = require('./utils');

module.exports = function(app, base, env) {
  var plugins = base.get('env.argv.plugins');

  app.data({
    runner: {
      name: 'verb',
      url: 'https://github.com/verbose/verb'
    }
  });

  // app.asyncHelper('apidocs', function(name, cb) {
  //   console.log(arguments)
  //   cb(null, '');
  // });

  app.asyncHelper('related', utils.related({verbose: true}));
  app.asyncHelper('reflinks', utils.reflinks({verbose: true}));
  app.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  app.helper('date', function () {
    return new Date();
  });

  // function handle(stage) {
  //   return utils.through.obj(function(file, enc, next) {
  //     if (file.isNull()) return next();
  //     app.handle(stage, file, next);
  //   });
  // }

  return function(cb) {
    cb();
    // app.toStream('files')
    //   .on('error', cb)
    //   .pipe(handle('onStream'))
    //   .pipe(app.pipeline(plugins))
    //   .pipe(handle('preWrite'))
    //   .pipe(app.dest('.'))
    //   .pipe(utils.exhaust(handle('postWrite')))
    //   .on('error', cb)
    //   .on('end', cb);
  };
};
