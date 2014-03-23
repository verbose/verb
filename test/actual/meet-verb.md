Verb's CLI makes kickstarting new markdown documentation a breeze.

For example, to generate a readme for your project just create a template, `docs/README.tmpl.md`, and add the following:

```
# {%= name %}

> {%= description %}

Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam.
```
And Verb will build this into `README.md` **using data from your project's package.json**.

**Built-in tags**

Need more than simple variables? Use one of Verb's [built-in tags](#TODO: add link), like `date()`:

```
## License
Copyright (c) {%= date('YYYY') %} {%= author.name %}, contributors.
Released under the {%= license.type %} license
```

**Includes**

Include other documents, allowing them to be reused across multiple projects, or just to organize:

```
## Contribute
{%= docs("contributing") %}
```

That's it! _(More docs are on the way.)_ [See this gist](https://gist.github.com/jonschlinkert/9712957) for a more detailed example.