Verb's CLI makes kickstarting new markdown documentation a breeze. Follow this

* Install [verb-cli](https://github.com/assemble/verb-cli) globally with `npm i -g verb-cli`.
* Install Verb locally with `npm i verb` to install Verb locally.

Ready to generate a basic readme? Great! Copy this markdown:

```
# {%%= name %}

> {%%= description %}

Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam.
```
and paste it into a file at `docs/README.tmpl.md`.

Once the  is installed, run `verb` to build it! Go ahead, I'll wait.

Back already?

It's that easy!
using data from your project's package.json

**Built-in tags**

Need more than simple variables? Use one of Verb's [built-in tags](#TODO: add link), like `date()`:

```
## License
Copyright (c) {%%= date('YYYY') %} {%%= author.name %}, contributors.
Released under the {%%= license.type %} license
```

**Includes**

Include other documents, allowing them to be reused across multiple projects, or just to organize:

```
## Contribute
{%%= docs("contributing") %}
```

That's it! _(More docs are on the way.)_ [See this gist](https://gist.github.com/jonschlinkert/9712957) for a more detailed example.