# Data

> Setting and getting data to be used in templates

## Table of contents

<!-- toc -->

Verb uses data from package.json to render templates, but there are several other ways to add data. This document describes how Verb works with data, and the methods to used for setting and getting data.

## Overview

- Options are stored on `verb.options`.


## package.json

> Verb uses data from package.json to render templates, and more...

Verb passes the entire package.json object to the template engine to be used as context for templates. But sometimes this isn't enough. For example, you might have a template that requires a Twitter or GitHub username. 

### verb object

If your package.json file has a `verb` property, Verb will use it to extend the context.

**Example**

```json
{ 
  "name": "my-project",
  "description": "It's awesome, seriously.",

  "verb": {
    "ignore": [
      ".git"
    ],
    "deps": {
      "ignore": [
        "support"
      ]
    },
    "data": {}
  }
}
```