
Add a `.verb.md.` [template]() to your project and run `verb` from the command line to generate the project's readme using data from package.json.

If you need more, use a [verbfile.js]().

**Example .verb.md**

This is a basic readme template that Verb's maintainers like to use.

```markdown
# {%%= name %} {%%= badge("fury") %}

> {%%= description %}

## Install
{%%= include("install") %}

## API
{%%= apidocs("index.js") %}

## Author
{%%= include("author") %}

## License
{%%= copyright() %}
{%%= license() %}

***

{%%= include("footer") %}
```

`.verb.md` files are rendered using data from `package.json`, but Verb is not restricted to package.json. You can use any data you want, with any templates, helpers, etc.
