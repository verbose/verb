/**
 * Example verbfile that defines custom tags.
 */


var verb = require('../');
var src = 'examples/templates/custom-tag.md';
var dest = 'test/actual/custom.tag.md';

verb.copy(src, dest, {tags: ['examples/tags/*.js']});
verb.log.success('Written to:', dest);
