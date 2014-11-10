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

// verb.helper('comments', require('verb-helper-comments'));

verb.helperAsync('docs', function (name, locals, cb) {
  var doc = this.cache.docs[name];
  this.render(doc, locals, function (err, content) {
    if (err) return cb(err);
    cb(null, content);
  });
});

verb.task('foo', function() {
  verb.src('.verbrc.md')
    .pipe(verb.dest('temp'));
});

verb.task('readme', function() {
  verb.src('.verbrc.md')
    // .pipe(dest(':dest/:basename'))
    .pipe(verb.dest('./'));
});

verb.task('default', ['foo', 'readme']);
```