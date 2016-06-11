'use strict';

require('mocha');
require('should');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var app;

describe('app.options.initTemplates', function() {
  it('should call `options.initTemplates` before any instance methods are called', function() {
    app = new App({
      initTemplates: function(app) {
        this.on('create', function(name, options) {
          options.viewType = 'partial';
        });
      }
    });

    app.create('includes');
    app.include('one', {path: 'two', contents: '...'});
    assert(app.includes.isType('partial'));
  });
});
