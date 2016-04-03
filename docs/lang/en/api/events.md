---
title: Events
---

Verb inherits from [component-emitter][]. 


_(See the [component-emitter][] docs to see all available methods and features.)_

## .on

The `on` method is used for listening for events emitted by Verb.

**Example**

```js
verb.on('error', function(err) {
  //
});
```

## .emit

The `emit` method is used for emitting events. 

**Example**

```js
verb.emit('error', new Error('foo'));
```

See the [component-emitter][] docs to see all available methods and features.

### deployBefore

Emitted before deployment begins.

### deployAfter

Emitted after deployment finishes.

### done

Emitted before Verb exits.

### generateBefore

Emitted before generation begins.

### generateAfter

Emitted after generation finishes.

### new

Emitted when the `--new` flag is passed.

``` js
verb.on('new', function(name, args) {
  //
});
```

Data | Description
--- | ---
`post.path` | Full path of the post file
`post.content` | Content of the post file

### processBefore

Emitted before processing begins. This event returns a path representing the root directory of the box.

### processAfter

Emitted after processing finishes. This event returns a path representing the root directory of the box.

### ready

Emitted after initialization finishes.
