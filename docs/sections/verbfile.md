
For projects that need more than readme documentation, you can add a `verbfile.js` to the project, and be sure to install verb locally with:

```bash
npm i verb --save-dev
```

**Example basic verbfile.js**

```js
var verb = require('verb');

// load data for templates if needed
verb.data('foo/*.json');

verb.task('default', function() {
  verb.src(['.verb.md', 'docs/*.md'])
    .pipe(verb.dest('./'));
});
```

