/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var frep = require('frep');
var delims = require('delims');
var template = require('../template');


/**
 * TODO: This isn't used anywhere.
 * Move it to example for delims!
 */

function makeDelims(delimiters) {
  var defaults = {body: '', flags: 'gm'};
  return delims(delimiters, defaults).evaluate;
}

function makeBlock(name) {
  var s = '\\s*';
  return [
    '\\{{2}('+s+name+s+')([\\S]+)'+s+'\\}{2}',
    '\\{{2}/('+s+name+s+')\\}{2}'
  ];
}

module.exports = function(phaser) {

  /**
   * Create a block template
   *
   * @return {String}
   * @api public
   */
  exports.block = function(str) {
    var blocks = [
      {
        pattern: makeDelims(makeBlock('block')),
        replacement: function (_, tag, context, inner) {
          context = phaser.context[context];
          return template(inner, context);
        }
      }
    ];
    return frep.strWithArr(str, blocks);
  };
  return exports;
};
