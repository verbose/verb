const Base = require('class-extend');
const expander = require('expander');
const getobject = require('getobject');
const _ = require('lodash');
const event = require('./event');


/**
 * The Cache constructor.
 *
 * This is Assemble's parent storage class.
 *
 * @class Cache
 * @param {Object} `obj`
 * @constructor
 * @api public
 */

function Cache (obj) {
  this.cache = obj || {};
}


/**
 * ## .set( key, value )
 *
 * Sets a new element by `key`.
 *
 * @method set
 * @param {String} `key`
 * @param {*} `value`
 * @param {Boolean} `expand`
 * @api public
 */

Cache.prototype.set = function (key, value, expand) {
  var result;
  var origCache = _.clone(this);
  var oldValue = this.get(key);

  if (expand) {
    result = expander.set(this.cache, key, value);
  } else {
    result = getobject.set(this.cache, key, value);
  }

  if (oldValue !== result) {
    event.emit(['cache', key, 'change'], oldValue, value);
    event.emit(['cache', 'change'], origCache, this);
  }
  return result;
};


/**
 * Store a constant.
 *
 * @method constant
 * @param {String} key
 * @param {*} value
 * @chainable
 */

Cache.prototype.constant = function(key, value){
  var getter;
  if (typeof value !== 'function'){
    getter = function(){
      return value;
    };
  } else {
    getter = value;
  }
  this.__defineGetter__(key, getter);
  return this;
};


/**
 * Check if `value` is enabled (truthy).
 *
 * this.enabled('foo')
 * // => false
 *
 * this.enable('foo')
 * this.enabled('foo')
 * // => true
 *
 * @method enabled
 * @param {String} value
 * @return {Boolean}
 * @api public
 */

Cache.prototype.enabled = function(value){
  return !!this.set(value);
};


/**
 * Check if `value` is disabled.
 *
 * this.'foo')
 * // => true
 *
 * this.enable('foo')
 * this.disabled('foo')
 * // => false
 *
 * @method disabled
 * @param {String} value
 * @return {Boolean}
 * @api public
 */

Cache.prototype.disabled = function(value){
  return !this.set(value);
};


/**
 * Enable `value`.
 *
 * @method enable
 * @param {String} value
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.enable = function(value){
  return this.set(value, true);
};


/**
 * Disable `value`.
 *
 * @method disable
 * @param {String} value
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.disable = function(value){
  return this.set(value, false);
};


/**
 * ## .merge ( arguments )
 *
 * Extend the cache with the given object.
 * This method is chainable.
 *
 * **Example**
 *
 * ```js
 * var cache = new Cache();
 * cache
 *   .merge({foo: 'bar'}, {baz: 'quux'});
 *   .merge({fez: 'bang'});
 * ```
 *
 * @chainable
 * @method merge
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.merge = function () {
  var args = [].slice.call(arguments);
  _.merge.apply(_, [this.cache].concat(args));
  return this;
};


/**
 * ## .get( key )
 *
 * Gets the data by key.
 *
 * @method get
 * @param {*} `key`
 * @param {Boolean} `create`
 * @return {*}
 * @api public
 */

Cache.prototype.get = function (key, create) {
  return getobject.get(this.cache, key, create);
};


/**
 * ## .all()
 *
 * Lists all elements.
 *
 * @method list
 * @return {Object}
 * @api public
 */

Cache.prototype.all = function () {
  return this.cache;
};


/**
 * ## .remove( key )
 *
 * Removes an element by key.
 *
 * @method remove
 * @param {*} key
 * @api public
 */

Cache.prototype.remove = function (key) {
  delete this.cache[key];
};


/**
 * ## .omit ( arguments )
 *
 * Omit properties from the cache.
 *
 * **Example**
 *
 * ```js
 * var cache = new Cache();
 * cache.set('src', 'foo/');
 * cache.set('dest', 'bar/');
 *
 * cache
 *   .omit('src');
 *
 * // or
 * cache
 *   .omit('src', 'dest');
 *
 * // or
 * cache
 *   .omit(['src']);
 *
 * // or
 * cache
 *   .omit(['src', 'dest']);
 * ```
 *
 * @chainable
 * @method omit
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.omit = function() {
  var args = [].slice.call(arguments);
  this.cache = _.omit.apply(_, [this.cache].concat(args));
  return this;
};


/**
 * ## .exists( key )
 *
 * Return true if an element exists.
 *
 * **Example**
 *
 * ```js
 * cache.exists('person');
 * //=> true
 * ```
 *
 * @method  exists
 * @param   {String}  key
 * @return  {Boolean}
 * @api public
 */

Cache.prototype.exists = function (key) {
  return getobject.exists(this.cache, key);
};


module.exports = Base.extend(Cache.prototype);
