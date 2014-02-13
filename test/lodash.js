var util = require('util');
var file = require('fs-utils');
var expect = require('chai').expect;
var _ = require('lodash');


describe('_.template', function () {

  describe('when using the Lo-Dash _.template method:', function () {
    it('should process a template with default delimiters.', function () {
      var compiled = _.template('hello <%= name %>');
      compiled({
        'name': 'fred'
      });
      var actual = compiled({
        'name': 'fred'
      });
      expect(actual).to.eql('hello fred');
    });

    it('should process a template with es6 delimiters.', function () {
      var compiled = _.template('hello ${ name }');
      compiled({
        'name': 'fred'
      });
      var actual = compiled({
        'name': 'fred'
      });
      expect(actual).to.eql('hello fred');
    });
  });
});
