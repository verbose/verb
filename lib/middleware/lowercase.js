module.exports = function (value) {
  if (typeof value === 'string') {
    return value.toLowerCase();
  } else {
    return value;
  }
};
