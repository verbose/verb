### Install with [npm](npmjs.org)

```bash
npm i -g {%= name %} --save-dev
```

Now that {%= name %} is installed, add `README.tmpl.md` to the `docs/` dir in your project (this is all customizable, but let's keep it simple here), and add this to the file:

{%= docs('example') %}

Next, run:

```bash
{%= name %}
```