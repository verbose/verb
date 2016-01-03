---
verb_docs:
  tags: ['template', 'built-in', '.verb.md', 'layout']
  title: Basic layout
---
# {%= name %} {%= badge('npm') %} {%= badge('travis') %}

> {%= description %}

## Install
{%= include('install-npm', {save: true}) %}

## Usage
{% body %}

## Running tests
{%= include("tests") %}

## Contributing
{%= include("contributing") %}

## Author
{%= include("author") %}

## License
{%= copyright({linkify: true}) %}
{%= license %}

***

{%= include("footer") %}
