## Tags, Filters and Variables

Which is which?!

For the most part, **variables** look like this

```
{%= foo %}
```

However, **tags** and **filters** both look like this:

```
{%= bar() %}
```

with the difference _(in Phaser)_ being that:

* **tags**: generate, include or otherwise "add" content of some kind
* **filter**: modify, filter, transform or otherwise alter content in some way

### Example: Tags vs. Filters

In this example:

* `condense` is a filter
* `include` is a tag

```
{%= condense(include('foo')) %}
```