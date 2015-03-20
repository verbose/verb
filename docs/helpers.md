# Helpers

> Registering and using helpers with Verb.

Helpers are used in templates to transform data, include other templates, or do anything else that can be done with JavaScript.

**Default helpers**

Verb can use any template engine to render templates. By default, Verb uses [engine-lodash], so the helpers we use by default are really just javascript functions that we pass to Lo-Dash on the context at render time.


## Verb's defaults

Helpers are used when data needs to be updated dynamically, or when it needs to be calculated
