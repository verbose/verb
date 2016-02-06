'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Utils
 */

require('extend-shallow', 'extend');
require('resolve-glob', 'glob');
require('is-affirmative');
require('try-open');
require = fn;

utils.exists = function(filepath) {
  if (typeof filepath === 'undefined') {
    return false;
  }
  var val = utils.tryOpen(path.resolve(filepath), 'r');
  return typeof val === 'number';
};

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

utils.renameKey = function(key, view) {
  return view ? view.filename : path.basename(key, path.extname(key));
};

utils.conflict = function(app, options, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('expected a callback function');
  }
  options = options || {};
  if (typeof options.filename !== 'string') {
    throw new TypeError('expected options.filename to be a string');
  }
  var filename = options.filename;
  var fp = path.resolve(options.cwd || process.cwd(), filename);
  app.questions.set('conflict', filename + ' exists, want to overwrite it?', {save: false});
  if (utils.exists(fp)) {
    app.ask('conflict', function(err, answers) {
      if (err) return cb(err);

      cb(null, !utils.isAffirmative(answers.conflict));
    });
  } else {
    cb(null, false);
  }
};

utils.ask = function(app, filename, cb) {
  if (app.disabled('force') && utils.exists(filename)) {
    cb();
    return;
  }

  // create a question
  app.questions.set('writefile', 'Can\'t find "' + filename + '", want to add one?', {
    save: false
  });

  // ask the question created above
  app.ask('writefile', function(err, answers) {
    if (err) {
      cb(err);
      return;
    }

    // if the answer is falsey, we're cb
    if (!utils.isAffirmative(answers.writefile)) {
      cb();
      return;
    }

    // if the answer is "affirmative", write the file
    app.src(filename, {cwd: path.resolve(__dirname, 'generators/templates')})
      .pipe(app.dest(app.cwd))
      .on('end', function() {
        console.log('created', filename);
        cb();
      });
  });
};

/**
 * Expose utils
 */

module.exports = utils;
