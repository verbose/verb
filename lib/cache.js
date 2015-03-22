'use strict';

/**
 * File cache, to prevent subsequent fs calls for the
 * same paths.
 *
 * This is only used on files that won't or shouldn't
 * change during the lifetime of this cache.
 */

module.exports = {};
