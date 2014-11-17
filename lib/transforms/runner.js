'use strict';

module.exports = function runner(app) {
  app.data({
    runner: {
      name: 'verb',
      url: 'https://github.com/assemble/verb'
    }
  });
};
