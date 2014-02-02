Example document:

```js
# [%= name %]

> [%= description %]

[%= toc %]

## Overview
[%= _.doc("overview.md") %]

## Options
[%= _.doc("options.md") %]

## Examples
[%= _.doc("examples.md") %]

## License and Copyright
[%= copyright %]
[%= license %]
```