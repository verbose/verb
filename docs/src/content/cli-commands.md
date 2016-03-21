---
title: CLI Commands
---

The following CLI commands are currently supported in verb.

### --ask

Force questions that match the given pattern to be asked. The resulting answer data is merged onto `app.cache.data`.

After questions are answered:

* Use `app.data('answers')` to get answer data.
* To open the directory where data is persisted, enter `--open answers` in the command line

**Example**

```sh
# ask all questions
$ --ask
# ask all `author.*` questions
$ --ask 'author.*'
# ask all `*.name` questions (like `project.name` and `author.name`)
$ --ask '*.name*'
```

### --config

Persist a value to a namespaced config object in package.json. For example, if you're using `verb`, the value would be saved to the `verb` object.

**Params**

* **{Object}**: app

**Example**

```sh
# display the config
$ --config
# set a boolean for the current project
$ --config=toc
# save the cwd to use for the current project
$ --config=cwd:foo
# save the tasks to run for the current project
$ --config=tasks:readme
```

### --cwd

Set the current working directory.

**Example**

```sh
# set working directory to 'foo'
$ --cwd=foo
# display cwd
$ --cwd
```

### --data

Set data on the `app.cache.data` object. This is the API-equivalent of calling `app.data()`.

**Example**

```sh
$ --data
# display data object
$ --data=foo
# sets {foo: true}
$ --data=foo:bar
# sets {foo: 'bar'}
$ --data=foo.bar:baz
# sets {foo:{bar: 'baz'}}
```

### --disable

Disable a configuration setting. This is the API-equivalent of calling `app.disable('foo')`, or `app.option('foo', false)`.

**Example**

```sh
$ --disable=foo
# sets {foo: false}
```

### --emit

Bind `console.error` to the given event listener, so that when event `name` is emitted, the event arguments will be output in the console.

**Example**

```sh
# emit errors
$ --emit error
# emit all views as they're created
$ --emit view
# emit only 'pages' as they're created
$ --emit page
```

### --enable

Enable a configuration setting. This is the API-equivalent of calling `app.enable('foo')`, or `app.option('foo', true)`.

**Example**

```sh
$ --enable=foo
# sets {foo: true}
```

### --global

Persist a value to the global config store by prefixing a command line option with `-g` or `--global`.

**Params**

* **{Object}**: app

**Example**

```sh
# save a boolean
$ -g=toc # saves `{ toc: true }` to global defaults
# save the cwd to use as a global default
$ -g=cwd:foo
# save the tasks to run by default
$ -g=tasks:readme
```

### --init

Ask initialization questions and persist answer data to the global config store.

**Example**

```sh
$ --init
```

### --open

Open a directory, or open a file in the default application associated with the file type.

**Example**

```sh
# Open the directory where answer data is persisted
$ --open answers
# Open the directory where store data is persisted
$ --open store
```

### --option

Set options on the `app.options` object. This is the API-equivalent of calling `app.option()`. You may also use the plural `--options` flag for identical behavior.

**Example**

```sh
$ --option=foo
# sets {foo: true}
$ --option=foo:bar
# sets {foo: 'bar'}
$ --option=foo.bar:baz
# sets {foo:{bar: 'baz'}}
```

### --options

Set in-memory options on the `app.options` object. This is the API-equivalent of calling `app.option()`. You may also use the singular `--option` flag for identical behavior.

To display currently defined options, pass the `--options` flag with no value.

**Example**

```sh
$ --options=foo
# sets {foo: true}
$ --options=foo:bar
# sets {foo: 'bar'}
$ --options=foo.bar:baz
# sets {foo:{bar: 'baz'}}
```

### --save

Persist a value to the global config store by prefixing a command line option with `--save` or `-s`.

**Params**

* **{Object}**: app

**Example**

```sh
# save a boolean
$ --save=toc # saves `{ toc: true }` to global config
# save the cwd to use as a global default
$ --save=cwd:foo
# save the tasks to run by default
$ --save=tasks:readme
```

### --tasks

Run the given generators and tasks. This flag is unnecessary when used with [base-runner](https://github.com/jonschlinkert/base-runner).

**Example**

```sh
# run task 'foo'
$ app --tasks foo
# => {task: ['foo']}
# run generator 'foo', task 'bar'
$ app --tasks foo:bar
# => {task: ['foo:bar']}
```

### --show

Returns true if `val` is true or is an object with `show: true`

**Params**

* `val` **{String}**
* `returns` **{Boolean}**
