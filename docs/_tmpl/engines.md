# Engines

> Registering and using template engines with Verb.

Verb's default template engine is [engine-lodash][], but Verb can use any template engine to render templates. 

## Overview

- engines are registered with `verb.engine()`
- when registered, engines are stored as objects on `verb.engines`. 
- async engines must follow [consolidate.js][consolidate] conventions, and sync engines must follow [engines.js][engines] conventions.
