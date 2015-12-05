'use strict';

module.exports = function(app, base, env) {
  app.data({
    runner: {
      name: 'verb',
      url: 'https://github.com/verbose/verb'
    }
  });

  var name = app.name;
  var user = base.store.get('author.username');
  app.data({repo: user + '/' + name});

  if (!app.cache.data.app) app.data({verb: {}});
  if (!app.cache.data.hasOwnProperty('description')) {
    app.data(app.get('env.user.pkg') || {});
  }

  // app.helper('shield', function() {
  //   return 'https://img.shields.io/travis/USER/REPO.svg';
  // });

  app.data({license: 'Released under the MIT license.'});
  app.questions.set('author.twitter', 'Author\'s twitter username?');
};
