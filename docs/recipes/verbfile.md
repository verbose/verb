# verbfile

> Creating a verbfile

A basic `verbfile.js`:

```js
'use strict';

var verb = require('verb4');
verb.data('package.json');

verb.task('default', function() {
  verb.src('.verbrc.md')
    .pipe(verb.dest(__dirname));
});
```

