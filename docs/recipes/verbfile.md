# verbfile

> Creating a basic verbfile.js

This is what the default `verbfile.js` looks like:

```js
var verb = require('verb');

verb.task('default', function() {
  verb.src('.verb.md')
    .pipe(verb.dest('.'));
});
```

