# Generate a README with Verb

> Learn how to build a README.md using Verb from the command line

Once `verb-cli` is installed, anytime you run the `verb` from the command line Verb will process templates in the `docs` directory with the `.tmpl.md` extension, saving the rendered files to the root of the project without the `.tmpl` extension. For example, `docs/foo.tmpl.md` is saved to `foo.md`.

Now that you know how to actually _build_ the README, let's review some options for actually defining your readme and creating the `README.tmpl.md` template.

## Create a README template

You have a couple of options

* create one from scratch
* use a generator

### Manually

Renaming the existing README.md in your project to `docs/README.tmpl.md` would be sufficient. However, if you're using Verb you probably want to take advantage of templates so that repetitive fields like `name`, `description`, `license`, `copyright` and dates are automatically filled in and updated.

Here are a some examples of templates for common fields to get you started:

```markdown
# {%= name %} {%= badge('fury') %}

> {%= description %}

## Install
This will include npm installation instructions.
{%= include('install') %}

## Author
I use `author.name` in package.json, define
this according to your preferences.

{%= author.name %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}
```

With your README template saved, next time you run `verb` you'll see a README.md appear in the root of the project!

### Using the Verb generator

Speed things up by installing [generator-verb](https://github.com/assemble/generator-verb) globally:

```bash
npm i -g generator-verb
```

Anytime you need a readme template, run:

```bash
yo verb:readme
```

That's it!


## Related

Learn how to use a [markdown config file](:config-files#verbrcmd).