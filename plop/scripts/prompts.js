const autocomplete = require('inquirer-autocomplete-prompt');

module.exports = (plop) => {
  plop.setPrompt('autocomplete', autocomplete);
};
