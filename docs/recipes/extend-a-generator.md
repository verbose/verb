# Extending verbApps

It's easy to extend a verbApp with the functionality, tasks and sub-verbApps of another verbApp.

Let's say you want to extend verbApp `xyz` with verbApp `abc`.

```js
verb.register('abc', function(app, base, env) {
});

verb.register('xyz', function(app, base, env) {
  base.on('preBuild', function() {
    var abc = base.getVerbApp('abc');
    abc.extendVerbApp(app);
  });
});
```

**Pro tip**

Run _both_ verbApps in different contexts:

```js
verb.build('templates', function(err) {
  if (err) return console.error(err);

  verb.verbApp('one')
    .build('templates', function(err) {
      if (err) return console.error(err);
      console.log(verb.views.templates);
    });
});
```