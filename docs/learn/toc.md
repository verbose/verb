## Generate a Table of Contents

> A few different options are available for creating a Table of Contents with Verb.

### Single page: code comment

Use the following syntax wherever you want the TOC:

```
<!-- toc -->
```

* Current page only
* Generate the TOC after everything is rendered.
* Any page with the `<!-- toc -->` code comment will include every section on the final rendered page.
* Leaves code comments behind marking the beginning and end of the TOC, but they won't be visible to viewers.


### Single page: `toc()` tag

Use the following syntax wherever you want the TOC:

```
[%= toc() %]
```

* When no arguments are passed a TOC is generated for the current page only
* Builds the TOC on-the-fly as each page is rendered.
* Unlike code comments, this doesn't "leave anything behind" after the build.
* But, it _does not recurse into includes_, so only the _current, top-level page_ will be used to generate the TOC.

### Multiple pages: `toc()` tag

Use the following syntax wherever you want the TOC:

```
[%= toc("*.md") %]
```

* Multiple pages
* Same syntax as `[%= toc() %]` but with a filepath or globbing patterns defined.
* Generates a complete table of contents that includes every section of every page defined
* Each section of the generated TOC begins with a heading that is created from the name of each file
* Adds relative links to each file
* Adds relative links to each section of each file.