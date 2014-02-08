
module.exports = function (value) {
  if (typeof value === 'string') {
    return value.split('').reverse().join('');
  } else {
    return value;
  }
};