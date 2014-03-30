/**
 * Date functions used in _.date() filter
 *
 * @name formatDate
 * @param  {Object} dateobj The date object to format.
 * @param  {String} structure The structure to use, e.g. 'YYYY-MM-DD'.
 *
 * @return {String} The formatted date.
 * @api public
 */

module.exports = function(structure) {
  /* jshint unused: false */

  var dateobj = new Date();

  var year    = dateobj.getFullYear();
  var month   = ('0' + (dateobj.getMonth() + 1)).slice(-2);
  var date    = ('0' + dateobj.getDate()).slice(-2);
  var hours   = ('0' + dateobj.getHours()).slice(-2);
  var minutes = ('0' + dateobj.getMinutes()).slice(-2);
  var seconds = ('0' + dateobj.getSeconds()).slice(-2);
  var day     = dateobj.getDay();

  var months  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dates   = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'];
  var output  = '';

  structure = structure || 'YYYY-MMM-DD DDD';
  switch (structure) {
  case 'YYYY-MM-DD':
    output = year + '-' + month + '-' + date;
    break;
  case 'YYYY':
    output = year;
    break;
  case 'full':
    output = dates[parseInt(day)] + ', ' + months[parseInt(month) - 1] + ' ' + date + ', ' + year;
    break;
  }
  return output;
};




