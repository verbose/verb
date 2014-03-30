Fields like `{%%= name %}` and `{%%= description %}` will be processed using data from your project's package.json. But sometimes you need more than that.

Here are some things you can do with Verb:

* Verb uses moment.js for `{%%= date() %}`
* `{%%= docs() %}` will include a file from the `docs` directory of your project (must have a `.md` extension)
* `{%%= include() %}` like `docs`, but includes a "generic" file from [verb-readme-includes](https://github.com/assemble/verb-readme-includes)

#### Last, make sure you **use the correct variables** for your project!!

For example, if `author` if formatted as a string, like this:

```json
{
  "author": "Jon Schlinkert"
}
```
then use `{%%= author %}`, not `{%%= author.name %}`.


A few things to know about Verb:

- [x] If verb-cli finds a `.verbrc.yml` file it will be used to extend the context, set options, etc. See [this example](https://gist.github.com/jonschlinkert/9686195)
- [x] If a `verbfile.js` is found, verb-cli will try to run it. See [this example](https://gist.github.com/jonschlinkert/9685280)