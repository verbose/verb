'use strict';

var path = require('path');
var isYes = require('is-affirmative');
var utils = require('../utils');

module.exports = function(verb) {
  verb.task('verbfile', function(cb) {
    ask(verb, 'verbfile.js', cb);
  });

  verb.task('default', ['verbfile']);
};

function ask(app, filename, cb) {
  console.log(filename)
  if (utils.exists(filename)) return cb();

  app.questions
    .set('verbfiles', 'Can\'t find a verbfile.js or .verb.md, want to add one?', {save: false})
    .set('choose', 'Which file(s) would you like to add?', {save: false});

  app.ask('verbfiles', function(err, answers) {
    if (err) return cb(err);

    if (isYes(answers.verbfiles)) {
      app.choices('choose', ['verbfile.js', '.verb.md'], function(err, choices) {
        if (err) return cb(err);

        app.src(choices.choose[0], {cwd: path.resolve(__dirname, 'templates')})
          .pipe(app.dest(app.cwd))
          .on('end', cb);
      });

    } else {
      cb();
    }
  });
}

function filter(name) {
  return function(key, file) {
    return file.basename === name;
  };
}
