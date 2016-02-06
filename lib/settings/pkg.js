'use strict';

module.exports = function(app, prop) {
  return app.pkg.get(prop) || {};
  // var pkg = require('./package');
  // var verb = pkg.verb || {};

  // var schema = new Schema(options)
  //   .field('layout', ['object', 'string', 'null'])
  //   .field('related', ['array', 'object'])
  //   .field('reflinks', ['array', 'object'])
  //   .field('plugins', ['array', 'object'], {
  //     normalize: function(val) {
  //       if (typeof val === 'string') {
  //         return [val];
  //       }
  //       return val;
  //     }
  //   });

  // return schema.normalize(verb);
};

    // .field('verb', 'object', verbSchema({
    //   keys: [
    //     'layout',
    //     'options',
    //     'data',
    //     'plugins',
    //     'helpers',
    //     'related',
    //     'reflinks'
    //   ]
    // }))
