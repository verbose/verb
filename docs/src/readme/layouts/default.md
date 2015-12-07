# {%= name %} {%= badge('npm') %} {%= badge('travis') %}

> {%= description %}

{% body %}

{% var list = get("verb.related.list") || [] %}{% if (list.length) { %}
## Related projects
{%= related(list) %}  
{% } %}
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

{% var links = get("verb.reflinks") || [] %}
{% if (links.length) { %}
{%= reflinks(links) %}
{% } %}
