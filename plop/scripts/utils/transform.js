const {
  camelCase,
  paramCase,
  pascalCase,
} = require('change-case');

const isCamelCase = (str) => {
  return camelCase(str) === str;
};

const isParamCase = (str) => {
  return paramCase(str) === str;
};

const isPascalCase = (str) => {
  return pascalCase(str) === str;
};

module.exports = {
  isCamelCase,
  isParamCase,
  isPascalCase,
};
