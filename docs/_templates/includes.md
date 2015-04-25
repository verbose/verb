# Includes

## author

> Add an `## Author` section

**Example**

```markdown
## Author
{%%= include("author") %}
```

**Result**

```markdown
## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)
```

**Twitter**

```js
{%%= include("author") %}
{%%= include("author", {username: 'jonschlinkert'}) %}
{%%= include("author", {twitter: 'jonschlinkert'}) %}
{%%= include("author", {twitter: {username: 'jonschlinkert'}}) %}
```

**GitHub**

```js
{%%= include("author") %}
{%%= include("author", {username: 'jonschlinkert'}) %}
{%%= include("author", {github: 'jonschlinkert'}) %}
{%%= include("author", {github: {username: 'jonschlinkert'}}) %}
```

**Both**

```js
{%%= include("author") %}
{%%= include("author", {username: 'jonschlinkert'}) %}
{%%= include("author", {github: 'jonschlinkert', twitter: 'jonschlinkert'}) %}
{%%= include("author", {
  github: {username: 'jonschlinkert'}, 
  twitter: {username: 'jonschlinkert'}
}) %}
```