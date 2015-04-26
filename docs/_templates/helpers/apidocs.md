# apidocs

> Generate API documentation from code comments using the apidocs helper.

This is about using and customizing the `apidocs` helper.



## Custom template

> Define a custom template to use

Pass the path to your template on the `template` option.

In verb, you can set the path the following ways:

**API**

```js
verb.option('apidocs', {template: './path/to/template.js'});
```

**CLI**

Store the path or module name on the global config:

```sh
$ verb --set apidocs.template="./path/to/template.js"
```