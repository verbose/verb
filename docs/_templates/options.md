# Options

> Setting and getting options

## Table of contents

<!-- toc -->

## Overview

- Options are stored on `verb.options`.


### package.json

> setting options in package.json

If your package.json file has a `verb` property with an `options` object, Verb will use it to extend the `verb.options` object.

**Example**

```json
{ 
  "name": "my-project",
  "description": "It's awesome, seriously.",

  "verb": {
    "options": {}
  }
}
```