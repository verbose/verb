# Load middleware from Verb config

The `verb` property in package.json can be used to define configuration options for verb. This recipe shows how to define a middleware and related options.

## Middleware method 

On the `verb` object in `package.json`, add a property where:

- the key is the name of the middleware method to run
- the value is either an options object, or an array of "options" objects (if multiple middleware are to be run)

**Example**

This would tell verb to add an `onLoad` middleware (but would fail since we haven't defined options yet):

```json
{
  "name": "foo",

  "verb": {
    "onLoad": {}
  }
}
```

## Middleware options

Now we need to tell verb a few things about the middleware:

- `path`: Where is the middleware? Whether it's a module dependency in `node_modules` or a local file, define this value the way you would define a require statement.
- `pattern`: the regex pattern to use for matching `view.path`
- `alias`: optionally specify an alias to use if, for example, you want to pass options to the middleware by the alias etc.

```json
{
  "name": "foo",

  "verb": {
    "onLoad": [
      {
        "path": "parser-front-matter",
        "pattern": "readme\\.md$"
      }
    ]
  }
}
```