---
verb_docs:
  tags: ['template', 'built-in', '.verb.md', 'layout']
  title: Minimal layout
---
# {%= name %}

> {%= description %}

{% body %}

## Author
{%= include("author") %}

## License
{%= copyright({linkify: true}) %}
{%= license %}

***

{%= include("footer") %}
