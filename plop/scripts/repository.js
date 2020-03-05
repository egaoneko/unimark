const {
  TEMPLATES_PATH,
  PACKAGES,
  LAYERS,
  TYPE,
} = require('./constant');
const {
  genAutocompletePrompt,
  genModuleInputPrompt,
  genClassInputPrompt,
} = require('./utils/prompt');

module.exports = (plop) => {
  plop.setGenerator('repository', {
    description: 'Create repository in package',
    prompts: [
      genAutocompletePrompt(
        'type',
        'Please choice type',
        TYPE,
      ),
      genAutocompletePrompt(
        'package',
        'Please choice package',
        PACKAGES,
      ),
      genAutocompletePrompt(
        'layer',
        'Please choice layer',
        LAYERS,
      ),
      genModuleInputPrompt(
        'module',
        'Please input module(ex: module-name)'
      ),
      genClassInputPrompt(
        'class',
        'Please input class(ex: ClassName)'
      ),
      genAutocompletePrompt(
        'parentLayer',
        'Please choice parent layer',
        LAYERS,
      ),
      genModuleInputPrompt(
        'parentModule',
        'Please input parent module(ex: module-name)',
        {empty: true}
      ),
      genClassInputPrompt(
        'parentClass',
        'Please input parent class(ex: ClassName)',
        {default: 'Repository'}
      ),
    ],
    actions: (answer) => {
      const actions = [];

      actions.push({
        type: 'add',
        path: `packages/{{package}}/src/{{layer}}/repositories/{{module}}/{{class}}.ts`,
        templateFile: `${TEMPLATES_PATH}/repository/repository.hbs`,
        abortOnFail: true
      });

      if (answer.type === 'class') {
        actions.push({
          type: 'add',
          path: `packages/{{package}}/__tests__/{{layer}}/repositories/{{module}}/{{class}}.spec.ts`,
          templateFile: `${TEMPLATES_PATH}/repository/repository-spec.hbs`,
          abortOnFail: true
        });
      }

      if (answer.package === 'core') {
        actions.push({
          type: 'add',
          path: `packages/{{package}}/__mocks__/{{module}}/{{class}}.ts`,
          templateFile: `${TEMPLATES_PATH}/repository/repository-mock.hbs`,
          abortOnFail: true
        });
      }

      return actions;
    }
  });
};
