'use strict';

module.exports = function(verb, base, env) {
  verb.data({
    runner: {
      name: 'verb',
      url: 'https://github.com/verbose/verb'
    }
  });

  var name = verb.name;
  var user = base.store.get('author.username');
  verb.data({repo: user + '/' + name});

  verb.data({license: 'Released under the MIT license.'});
  verb.questions.set('author.twitter', 'Author\'s twitter username?');

  if (!verb.cache.data.verb) verb.data({verb: {}});
  if (!verb.cache.data.hasOwnProperty('description')) {
    var pkg = verb.get('env.user.pkg') || {};
    verb.data(pkg);
  }
};
