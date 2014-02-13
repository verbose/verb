## templates

## Readme template

* `docs/`
* `node_modules/grunt-readme/templates/`
* `options.readme`
* `options.resolve.readme`


## YAML Front Matter
Add YAML front matter to documents to extend the metadata that is supplied to your project's templates.

```
---
username: jonschlinkert
---
```
This is probably most useful when:
1. You need to use the same or similar templates on a number of different projects
1. You want to supply data to the templates that won't typically be found in package.json


## Code Comments
Code comments may be used in markdown templates, and they will be stripped from the rendered README as long as they adhere to the following syntax:

```handlebars
{{!-- foo --}}
{{! foo }}
{{!foo}}
```

## Escaping

### Escaping hashes
This task automatically adjusts heading levels in included templates. For example, `#` is adjusted to `##`, so that heading levels "line up" properly after the README is built.

This can cause problems if you're using hashes for a reason other than headings, such as CSS Id's in code comments. So to prevent phaser from converting `#id {}` to `##id {}`, just add a  single backtick before the hash: <code>`#id {}</code>.

### Escaping Lo-Dash templates
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (_as with code examples_), just use square brackets instead of curly braces in any templates that have similar patterns to these: `{%= .. %}`, `{%- .. %}`, and `{% .. %}`. The square brackets will be replaced with curly braces in the rendered output.
