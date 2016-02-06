'use strict';

module.exports = function(verb) {
  verb.register('welcome', require('./welcome'));
  verb.register('verbfiles', require('./verbfiles'));
  verb.register('verbfile', require('./verbfile'));
  verb.register('verbmd', require('./verbmd'));

  verb.task('default', function(cb) {
    console.log('verb > default task');
    verb.generate('verbfiles', cb);
  });
};
