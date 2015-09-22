var verb = require('../');
var app = verb();

app.config('helpers', app.helper.bind(app));
console.log(app._.helpers)
