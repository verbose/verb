> Verb's CLI makes kickstarting new markdown documentation a breeze.

For example, to [generate a readme](https://github.com/assemble/generator-verb) for your project just add `docs/README.tmpl.md` with the following:

```markdown
# {%%= name %}

> {%%= description %}

Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam.
```

Then run `verb` in the command line and it will generate `README.md`, _automatically using data from your project's package.json to process templates_.

**[Built-in tags](./DOCS.md#tags)**

Need more than simple variables, like `date()`? Use one of Verb's [built-in tags](./DOCS.md#date):

```markdown
## License
Copyright (c) {%%= date('YYYY') %} {%%= author.name %}, contributors.
Released under the {%%= license.type %} license
```

**[Includes](./DOCS.md#include)**

Easily include other documents. To use any markdown file in the `docs/` directory just use [`{%%= docs() %}`](./DOCS.md#docs):

```markdown
## Contribute
{%%= docs("contributing") %}
```

That's it! [See this gist](https://gist.github.com/jonschlinkert/9712957) for a more detailed example.

This is just a simple example though, Verb can easily build multi-page markdown documentation, with a fully-linked [multi-page TOC](./DOCS.md#toc), or even build a book!

_(Verb builds its own docs (WIP) too, check progress in the [docs directory](./docs)!)_.

