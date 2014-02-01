# Front Matter

> Phaser uses [gray-matter]() for parsing front-matter. So in addition to YAML, you can also use JSON, Coffee, or plan JavaScript.


## Examples

```markdown
---coffee
json = (src) ->
  return require('fs-utils').readJSONSync(src)

pkg = json('package.json')
---

> {%= pkg.name %}

```



```markdown
---coffee
# Variables
user = 'jonschlinkert'

# Functions
reverse = (src) ->
  src.split('').reverse().join('')

include = (src) ->
  return require('fs').readFileSync(src)

# Method call
reverseUser = reverse(user)
---

{%= user %}
{%= reverse(user) %}
{%= include('file.md') %}
{%= reverseUser %}
```