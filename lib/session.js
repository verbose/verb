'use strict';

/**
 * Session storage
 */

var storage = require('./storage');
var session = storage.get('verb session') || storage.create('verb session');

/**
 * Backup cache when session is inactive
 */

function Cache() {
  this.cache = {};
}

Cache.prototype.set = function(key, value) {
  this.cache[key] = value;
  return this;
};

Cache.prototype.get = function(key) {
  if (key == null) {
    return this.cache;
  }
  return this.cache[key];
};

var cache = new Cache();

/**
 * Determine if the session is actually active.
 *
 * @return {Boolean} Returns `true` if session is active
 * @api private
 */

var isActive = function() {
  try {
    var key = '___session is active___';
    return session.get(key) || session.set(key, true);
  } catch (err) {
    return false;
  }
};

/**
 * Create a context to run in.
 *
 * @param {Function} `fn` function to run in the session context
 * @api private
 */

module.exports.run = session.run.bind(session);

/**
 * Get a value from the current session by the given key.
 *
 * @param  {String} `key` Key used to retrieve the value
 * @return {mixed}  Value of the key or undefined
 */

module.exports.get = function(key) {
  if (isActive()) {
    return session.get(key);
  }
  return cache.get(key);
};

/**
 * Set a value on the current session by the given key.
 *
 * @param {String} `key`   Key used to set the value
 * @param  {mixed} `value` Value to set
 * @return {mixed} Value that was just set
 */

module.exports.set = function(key, value) {
  if (isActive()) {
    return session.set(key, value);
  }
  return cache.set(key, value);
};