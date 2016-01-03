---
name: verb
title: Middleware
engine: hbs
description: ""
related: ['en-route']
reflinks: ['en-route']
---

While plugins and middleware are both used to "extend" {{name}}, they serve very different purposes, are used in completely different ways, and have access to different objects at runtime. 

## What is middleware?

(Some verbiage was borrowed from [express's middleware docs][express])

Middleware functions are functions that have access to the `file` object (or in {{name}}'s case, the `view` object), and a callback function that represents the `next` middleware in the application’s build cycle.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the `file` object.
- Call the `next` middleware function in the stack.

[express]: http://expressjs.com/en/guide/using-middleware.html