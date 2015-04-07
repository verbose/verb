## Template data

> Load data to pass to templates


```js
var verb = require('verb');
```

```js
verb.data('data/*.yml');
verb.layout('default.md', '<foo>\n<<% body %>>\n</foo>');
verb.includes('includes/*.md');
verb.docs('docs/*.md');

verb.helperAsync('docs', function (name, locals, cb) {
  var doc = this.cache.docs[name];
  this.render(doc, locals, function (err, content) {
    if (err) return cb(err);
    cb(null, content);
  });
});

verb.task('readme', function() {
  verb.src('.verb.md')
    .pipe(verb.dest('./'));
});

verb.task('docs', function() {
  verb.src('docs/_templates/*.md')
    .pipe(verb.dest('./wiki'));
});

verb.task('default', ['readme', 'docs']);
```
