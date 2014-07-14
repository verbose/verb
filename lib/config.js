/**
 * Initialize user-config object. Unless overridden by passing
 * an object to `options.config`, this defaults to the
 * package.json of the user's current, local project,
 *
 * @param {Object} data
 * @return {Object}
 *
 * @api private
 */
const plasma = require('plasma');

module.exports = function(verb) {
  var opts = verb.options || {};
  var data = {};

  // Load package.json unless an explicit data object is passed in,
  // or if options.config is defined as "false"
  if((opts.config && (Object.keys(opts.config).length > 0 || opts.config === false))) {
    data = opts.config;
  } else {
    try {
      data = plasma(verb.cwd('package.json'));
    } catch (e) {
      e.origin = __filename;
      throw new Error('No config object or "package.json" was found', e);
    }
  }
  
  // If package.json has an author string instead of an author object, 
  // split the string so the data can be used in templates.
  if (typeof data.author === 'string') {
    var authorString = data.author;
    
    // Split the string into an array.
    authorArray = authorString.split(/<|>/);
    
    // Clean up the name and URL strings, but only if they exist.
    if (authorArray[0]) {
      authorArray[0] = authorArray[0].slice(0, -1);
    } else if (authorArray[2]) {
      authorArray[2] = authorArray[2].substr(2).slice(0, -1); 
    };
    
    // Create the new author object
    var author = {
      name: authorArray[0],
      email: authorArray[1],
      url: authorArray[2]
    };
    
    // Update the data object
    data.author = author; 
  };

  return data;
};