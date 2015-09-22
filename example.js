var argv = require('minimist')(process.argv.slice(2));
var lint = require('lint-templates');
var verb = require('./');
var app = verb()
  .use(lint())


// app.includes.load('*.md');
app.badges.load('*.md');

app.on('error', function (err) {
  if (err) {
    console.log(err.stack);
    process.exit(0);
  }
});

app.badges.getView('bower')
  // .set('data.name', 'NAME')
  // .set('data.github.repopath', 'verbiagesss')
  .lint(/\{%=?([^%]+)%}/g)
  .lint(/\{{([^}]+)}}/g)
  // .render(function (err, res) {
  //   if (err) return console.error('Error:', err);
  //   if (res) console.log('Done:', res);
  // });

