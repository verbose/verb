> Verb will make any data from valid front matter available to your templates

## Valid Languages

Verb uses [gray-matter](https://github.com/assemble/gray-matter) for parsing front matter, so any format allowed by that library should work, including:

* JSON
* YAML
* TOML
* Coffee-script

Please see the [gray-matter](https://github.com/assemble/gray-matter) project for documentation and to see all available options.


### Coffee

**Example**

Pass data to be used for generating [dotfiles](./docs/dotfiles.md):

```coffee
---coffee
options =
  dotfiles: require './dotfiles.json'
---
```
