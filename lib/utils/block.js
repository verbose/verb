/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var frep = require('frep');
var delims = require('delims');
var template = require('../template');


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
          context = params.context[context];
          return template(inner, context);
        }
      }
    ];
    return frep.strWithArr(str, blocks);
  };
  return exports;
};
