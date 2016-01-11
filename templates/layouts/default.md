---
verb_docs:
  tags: ['template', 'built-in', '.verb.md', 'layout']
  title: Default layout
---
# {%= name %} {%= badge('npm') %} {%= badge('travis') %}

> {%= description %}

<!-- toc -->

{% body %}

{%= section("Related projects", "related-list") %}
{%= section("Running tests", "tests") %}
{%= section("Contributing", "contributing") %}
{%= section("Author", "author") %}

## License
{%= copyright({linkify: true}) %}  
{%= license %}

***

{%= include("footer") %}
