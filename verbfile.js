'use strict';

module.exports = function(verb) {
  verb.extendWith('readme');

  verb.task('foo', function(cb) {
    console.log('verb > verbfile >', this.name, 'task');
    cb();
  });

  verb.task('default', ['readme']);
};
