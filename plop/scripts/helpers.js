module.exports = (plop) => {
  plop.setHelper('ifEquals', function (str1, str2, options) {
    return str1 === str2 ? options.fn(this) : options.inverse(this);
  });
  plop.setHelper('ifNotEquals', function (str1, str2, options) {
    return str1 !== str2 ? options.fn(this) : options.inverse(this);
  });
};
