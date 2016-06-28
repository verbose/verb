'use strict';

var Base = require('../..');
var base = new Base({isApp: true});

base.register('not-exposed', function(app) {

});
