'use strict';

/**
 * File cache, to prevent subsequent calls for the
 * same paths. This for internal use for templates
 * that are stored in `node_modules` and won't
 * change during the lifetime of this cache.
 */

module.exports = {};