### Install with [npm](npmjs.org)

```bash
npm i -g phaser --save-dev
```

Now that phaser is installed, add `README.tmpl.md` to the `docs/` dir in your project (this is all customizable, but let's keep it simple here), and add this to the file:

```markdown
# {%= name %}

> {%= description %}

Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

Now that {%= name %} is installed, run: `{%= name %}`

## Author
{%= author.name %}

## License
{%= copyright() %}
{%= license() %}
```

Next, run:

```bash
phaser
```