/**
 * ## function timetamp()
 * Get the current time using `.toISOString()`
 *
 * @return {String}
 * @api Public
 */

module.exports = function () {
  return new Date().toISOString();
};