/**
 * Get the current time using `.toISOString()`
 * @name function timetamp()
 * @return {String}
 * @api Public
 */

module.exports = function () {
  return new Date().toISOString();
};