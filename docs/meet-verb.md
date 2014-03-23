Verb's CLI makes kickstarting new markdown documentation a breeze.

For example, to [generate a readme](https://github.com/assemble/generator-verb) for your project just add `docs/README.tmpl.md` with the following:

```
# [%= name %]

> [%= description %]

Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam.
```
And Verb will build this into `README.md` **using data from your project's package.json**.

**[Built-in tags](./docs/tags.md)**

Need more than simple variables? Use one of Verb's [built-in tags](./docs/tags.md), like `date()`:

```
## License
Copyright (c) [%= date('YYYY') %] [%= author.name %], contributors.
Released under the [%= license.type %] license
```

**[Includes](./docs/tags.md#include)**

Easily include other documents. To use any markdown file in the `docs/` directory just use [`[%= docs() %]`](./docs/tags.md#docs):

```
## Contribute
[%= docs("contributing") %]
```

That's it! [See this gist](https://gist.github.com/jonschlinkert/9712957) for a more detailed example.

_(More docs are on the way! In the meantime, check progress in the [docs directory](./docs))_.