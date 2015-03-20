'use strict';

/**
 * Define default options.
 */

module.exports = function options_(verb) {
  // engines
  verb.disable('debugEngine');
  verb.option('viewEngine', 'md');

  // routing
  verb.option('router methods', ['onInit']);
  verb.enable('case sensitive routing');
  verb.enable('strict routing');

  // delimiters
  verb.addDelims('md', ['{%', '%}'], ['<<%', '%>>']);
  verb.option('delims', ['{%', '%}']);
  verb.option('layoutDelims', ['<<%', '%>>']);
  verb.option('escapeDelims', {
    from: ['{%%', '%}'],
    to: ['{%', '%}']
  });
};
