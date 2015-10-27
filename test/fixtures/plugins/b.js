module.exports = function (app) {
  console.log('plugin B');
  app.set('b', 'BBB');
};
