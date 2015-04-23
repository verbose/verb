# Generate a Table of Contents

> Single or multi-file!

For a single-file TOC, add the following to the place where you want the TOC to render:

```html
<!!-- toc -->
```

For a multi-file TOC, add the following to the place where you want the TOC to render:

```html
<!!-- toc("*.md") -->
```

**Escaping**

If you ever need to add a TOC comment to documentation for illustrative purposes and you do not want it to render:

Do this:

```html
<!!!-- toc -->
```
