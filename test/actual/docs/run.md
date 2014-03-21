Now that verb is installed, add a `README.tmpl.md` to a `docs/` dir in your project with this content:

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

That wasn't so hard, was it? (It was? Tell us about it. ).