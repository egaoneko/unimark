const {
  isParamCase,
  isPascalCase,
} = require('./transform');

const genAutocompletePrompt = (name, message, source) => {
  return {
    name,
    message,
    type: 'autocomplete',
    source: Array.isArray(source) ? (answer, input) => new Promise((resolve) => {
      input = input || '';
      if (!input) {
        resolve(source);
      } else {
        resolve(source.filter((value) => value.toLowerCase().indexOf(input.toLowerCase()) > -1));
      }
    }) : source,
  };
};

const genModuleInputPrompt = (name, message, options) => {
  options = {
    empty: false,
    ...options
  };
  return genValidateInputPrompt(
    name,
    message,
    (input) => {
      if (!options.empty && !input) {
        return `${name} can not be empty`;
      }

      if (!isParamCase(input)) {
        return `${name} must be param case`;
      }

      return true;
    },
    {
      default: options.default,
    }
  );
};

const genClassInputPrompt = (name, message, options) => {
  options = {
    empty: false,
    ...options
  };
  return genValidateInputPrompt(
    name,
    message,
    (input) => {
      if (!options.empty && !input) {
        return `${name} can not be empty`;
      }

      if (!isPascalCase(input)) {
        return `${name} must be pascal case`;
      }

      return true;
    },
    {
      default: options.default,
    }
  );
};

const genValidateInputPrompt = (name, message, validate, options) => {
  return {
    name,
    message,
    validate,
    type: 'input',
    ...options,
  };
};

module.exports = {
  genAutocompletePrompt,
  genModuleInputPrompt,
  genClassInputPrompt,
};
