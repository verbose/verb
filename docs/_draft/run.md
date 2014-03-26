Now that {%= name %} is installed, add a `README.tmpl.md` to a `docs/` dir in your project with this content:

```markdown
{%= docs("extras/example-readme", {raw: true}) %}
```

Next, in the command line run:

```bash
verb
```

That wasn't so hard, was it? (It was? Tell us about it. {%= include('report-issues') %}).