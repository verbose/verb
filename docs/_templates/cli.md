# CLI

> Verb's commands and command line usage

## Usage

All commands are preceded by `--`:

```bash
$ verb --foo
```

## Commands

- `--nocheck`: don't lint or correct template helpers or variables. See [conflicts].

### Data store

Verb offers a few methods for persisting and getting "default" config data from the command line. Any values set from the command line are saved in a JSON file in

- when a property is set from the command line it will persist 

**Data store commands**

- [.set](#-set): set a property.
- [.get](#-get): show a property in the command line
- [.del](#-del): delete a property

`verb.store.data` `verb.cache.data`[1] from the command line.  which is the object Verb uses for storing data to be passed as context to templates at render time.

#### .set

Set or extend a property on `verb.cache.data`.

```bash
$ verb --set foo=bar
```

**Dot notation**

Dot-notation may also be used to set values. 

Example:

```bash
$ verb --set author.name="Jon Schlinkert"
```

#### .get

Show a property from `verb.cache.data` in the command line.

```bash
$ verb --get foo
```

Outputs:

```bash
$ foo = bar
```

**Dot notation**

Dot-notation may also be used to get values. 

Example:

```bash
$ verb --get author.name
```

Outputs:

```bash
$ author.name = "Jon Schlinkert"
```

#### .del

Delete a property from `verb.cache.data`

```bash
$ verb --del foo && verb --get foo
```
Outputs:

```bash
$ foo = undefined
```

### Other commands

```bash
$ verb --foo
```
