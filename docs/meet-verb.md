Verb's CLI makes kickstarting new documentation a breeze. Here is how Verb can keep your documentation up-to-date using variables from your [project's package.json](#TODO: add link to 'data'):

```markdown
# [%= name %]

> [%= description %]

Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam.
```
Now put this in `docs/README.tmpl.md` and run `verb` to build it! It's that easy!

Need more than simple variables? Use one of Verb's [built-in tags](#TODO: add link), like `date()`:

```markdown
## License
Copyright (c) [%= date('YYYY') %] [%= author.name %], contributors.
Released under the [%= license.type %] license
```

Include other documents, allowing them to be reused across multiple projects, or just to organize:

```markdown
## Contribute
[%= docs("contributing") %]
```

That's it! _(More docs are on the way.)_