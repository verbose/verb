# Context

> When templates are rendered, "context" is the data object used by the rendering engine to resolve variables in template strings to their actual values. 

Typically, the _context object_ is created dynamically at render time by merging multiple source objects together (before being passed to the rendering engine). Thus, it only exists in memory.

For example, data from [front-matter][] is often merged with `locals` to create the context object.

**How context is created**

When a template is rendered a context object is created and passed to the rendering engine for that template. This object is created any or all of the following data sources, depending on options or customizations:

- **dynamic data**: data that is dynamically generated at runtime or only exists at certain points during runtime, like pagination info, destination file paths or URLs, permalinks, navigation variables, an so on.
- **locals**: an object that is passed to the `render` method
- **globals**: an object that is intended to be universally made available to all templates, and is created from some "globally" stored data object. {{upper name}} Stores global data on `{{name}}.cache.data`. See the [data][] docs for more details.