Now that verb is installed, add a `README.tmpl.md` to a `docs/` dir in your project, adding this to the file:

```markdown
# {%= name %}

> {%= description %}

## Getting started
Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

## Options
{%= docs("options") %}

## Examples
{%= docs("examples") %}

## Author
+ {%= author.name %}

## License
{%= copyright() %}
{%= license() %}
```

Next, in the command line run:

```bash
verb
```

That wasn't so hard, was it? (It was? Please [report any bugs or feature requests](https://github.com/assemble/verb/issues/new), thanks!).