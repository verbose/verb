# Helper conflict resolution

> This describes how helper conflict resolution works in Verb, as well as **why it works this way**

_(If you have any suggestions for doing this differently, please let us know!)_

**What's a "helper conflict"?**

Helper conflicts occurr when all of the following conditions are met:

1. A helper function is registered with the same name as an arbitrary property on the context, and
2. The template engine being used does not have first class support for helper functions
3. The user opts to _not_ namespace the data on some arbitrary property

_(Note that if namespacing is used consistently across all projects, like using `foo.name` instead of just `name`, then these issues go away. However, [namespacing presents its own set challenges][1].)_

**What is "first class" helper support?**

First, some background. Verb must pass templates, partials, data and helper functions to engines in a way that the engine understands. Some engines, like Handlebars, support all of these concepts as separate, first-class entities. Which makes life easy and provides (non-hacky) options for keeping data, helpers and templates cleanly separated. It also dramatically reduces the logic required to handle each of these concepts. We'll call these engines Type 1 engines. Other engines, like Lo-Dash, only understand templates and data. We'll call these Type 2 engines. Neither is better or worse.

An advantage of Type 2 engines is that they are usually faster and, given that they have no real conventions for helpers, helpers are just plain javascript, which makes them (marginally) easier to write. 

Verb's default engine is [engine-lodash], a Type 2 engine. Given that Type 2 engines have no first class support for helpers, helpers are treated the same as any other data and are passed as arbitrary properties on the context. If a property on the context happens to have a function value, the only special treatment it gets is that the engine simply calls the function (helper) in the given context. Still, it's just another property on the context. 

The same applies to partials. Partials are also passed as arbitrary properties on the context. 

**The challenge**

What makes this a sticky situation is that we need to adhere to the rules of JavaScript: Object keys must be unique. 

**Example**

By way of example, let's see what happens when the following occurs:

```js
// `context` and `helpers` are passed to an engine 
// on the engine's `options` object

var options = {context: {foo: 'bar'}, helpers: {foo: [function]}}''
```

At render-time, these objects are passed to the engine separately, then, since the engine needs all of these values on one object (as context), the (Type 2) engine merges them together just before rendering a template. (This is something an implementor would need to do when implementing an engine. Feel free to follow the pattern used by [engine-lodash]).

**Who should win: data or helper?**

Continuing with the above code example, what should we end up with when we merge the `helpers` and `context` objects? 

```js
var ctx = _.extend({}, options.helpers, options.context);
//=> ctx.foo === 'bar' ???
```
Or:

```js
var ctx = _.extend({}, options.context, options.helpers);
//=> ctx.foo === [function] ???
```

And which of the following should the template engine give priority to? 

```js
// non-function value
{%= foo %}

// helper function
{%= foo("quux") %}
```

You might be wondering:

**But, how often does this happen?**

The short answer is: a lot.  The long answer is: a looooooooot.

**Isn't this just an edge case?**

No, it happens a lot. In other words, it happens more often than not a lot. 

_(Just seeing if you're paying attention :)_

## Solution: namespacing on-the-fly

Hack or not, of all the solutions we've tried we find this to be the easiest to maintain.

**Conflict resolution middleware**

Verb's [conflict-resolution middleware][] does the following:

1. Gets keys of all properties on the `verb.cache.data` object
2. Scans templates for helpers that use those properties
3. When a helper is found with a name that matches a property on the context:
   + the helper function is moved from `verb._.helpers.foo` to `verb._.helpers.__.foo`
   + the helper is renamed in the string using the `__.` prefix (see below)

**Resulting in the following**

The final context object ends up like this:

```js
var ctx = _.extend({}, options.context, options.helpers);
//=> {foo: 'bar', __: {foo: [function]}}
```

And the helper is renamed as follows

```js
// from this
{%= foo("quux") %}

// to this
{%= __.foo("quux") %}
```

Now, both of the following templates will resolve:

```js
{%= foo %}
{%= __.foo("quux") %}
```

**Done!**

To the user, this is transparent. You would never even know it was happening unless you inspected the string after the `.preRender()` middleware is called. Benchmarks showed a 2 millisecond difference when conflicting helpers were updated in ten templates. Clearly this would compound, but in our opinion it's a very acceptable compromise if your using Verb on a small project or just using verb to build a readme.

## Notes

#### 1 

As it relates specifically to the **auto-generated data in Verb**, the challenge with namespacing is that it dramatically increases the amount of logic necessary to normalize data that would otherwise be on a single object. 

For example, there are several transforms and middleware that normalize package.json values. Namespacing with arbitrary objects necessitates far more logic to provide the same user experience.

More so, I=if we were to, say, allow the user to define a custom property to use, then templates quickly become much less likely to be re-usable and transferrable across projects. 
