'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('matched');

module.exports = function(verb, base, env) {
  verb.task('default', function() {});
  verb.task('readme', function() {});

  verb.task('templates', function(cb) {
    var opts = {cwd: env.cwd, dot: true};
    if (!verb.templates) verb.create('templates');

    glob('templates/*', opts, function(err, files) {
      if (err) return cb(err);

      files.forEach(function(name) {
        var fp = path.join(env.cwd, name);
        verb.template(name, {path: fp, content: fs.readFileSync(fp)});
      });
      cb();
    });
  });

  verb.register('docs', function(app) {
    app.task('x', function() {});
    app.task('y', function() {});
    app.task('z', function() {});

    app.register('foo', function(app) {
      app.task('x', function() {});
      app.task('y', function() {});
      app.task('z', function() {});
    });
  });
};
