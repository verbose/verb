# Middleware 

> Methods for defining and using middleware and routes

**What is "middleware"?**

A middleware is a function that is invoked by a middleware handler. 

**What is a "handler"?**

Middleware handlers are invoked at pre-determined points during runtime, each of which is typically associated with a specific middleware method known as a "verb" that will only be invoked by that handler. 

For example, the `.onLoad()` method is invoked by the `onLoad` handler when templates are loaded, and the `.preRender()` method is invoked by the `preRender` handler before templates are passed to the engine for rendering.

**What does the handler do?**

When a handler is invoked

**Middleware stack**

A middleware stack is an array of middlewares.

- Each file that passes through the [pipeline](./api-task.md#pipeline.md) has its own middleware stack, which may have zero or more middleware functions 
- Middleware functions are always invoked in the order in which they are defined.


**Routes**

Given that "verbs" determine **when** middleware 


**Verbs**

> verbs determine **when to run**

- Special middleware methods known as "verbs" determine **when** middleware functions are run
- Each verb is invoked by a middleware _handler_ that is configured to run that specific verb, at a specic point during runtime. For example, the `onLoad` handler invokes all `.onLoad()` middleware when a template is loaded.

**Routes**

> routes determine **which files to operate on**

- Routes are used to selectively match **which** files to operate on.

 certain triggers 

Middleware is any number of functions that are invoked by the Express.js routing layer before your final request handler is, and thus sits in the middle between a raw request and the final intended route. We often refer to these functions as the middleware stack since they are always invoked in the order they are added.


## API 

### .use

### .route

### .all

### .onLoad

### .preRender`

### .postRender`

***

## Related topics