'use strict';

var Generate = require('./');
var app = new Generate({foo: 'bar'});

app.register('a', function(a, base) {
  a.register('a1', function(aa) {
    aa.register('aaa', require('./generators/f/generator.js'));
    aa.task('default', function(cb) {
      console.log('aa > default');
      cb();
    });
  });
  a.register('a2', function(aa) {
  });
});

app.register('b', new Generate());
app.generators.b.register('bb', function(bb) {
  bb.register('bbb', function() {});
  bb.task('default', function(cb) {
    console.log('bb > default');
    cb();
  });
});

app.register('c', function(c, base) {
  c.register('cc', function(cc, basecc) {
    cc.task('default', function(cb) {
      console.log('cc > default');
      cb();
    });

    cc.register('base', require('./generator'));
  });
});

app.generate('a.a1.aaa', ['default'], function(err) {
  if (err) throw err;
  console.log('DONE!!!');
});
