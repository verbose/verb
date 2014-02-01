# phaser

> Markdown documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.

## Example "README" template

Example document:

```js
# {%= name %}

> {%= description %}

{%= toc %}

## Overview
{%= _.doc("overview.md") %}

## Options
{%= _.doc("options.md") %}

## Examples
{%= _.doc("examples.md") %}

## License and Copyright
{%= copyright %}
{%= license %}
```