'use strict';

module.exports = function(verb, base, env) {
  if (!verb.questions.has('author.twitter')) {
    verb.questions.set('author.twitter', 'Author\'s twitter username?');
  }
};
