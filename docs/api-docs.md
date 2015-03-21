# API docs


```js
var verb = require('verb');
var tap = require('gulp-tap');

verb.task('api', function () {
  verb.src('api/**/*.md')
    // .pipe(tap(function (file) {
    //   console.log('file', file.contents.toString());
    // }))
    .pipe(verb.dest('api-dest'));
});
```
