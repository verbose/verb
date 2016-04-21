# Extend a generator


```js
module.exports = function(verb) {
  verb.extendWith('verb-readme-generator');
  verb.docs('docs/*.md', {cwd: __dirname});
};
```

## Extend with the default generator

Extend a specified generator with the `default` generator (`verbfile.js`):

```js
// --verbfile.js--
module.exports = function(app) {
  app.data({name: 'foo-bar'});
};
```
