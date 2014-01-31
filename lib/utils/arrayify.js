var arrayify = module.exports = function(arr) {
  return !Array.isArray(arr) ? [arr] : arr;
};