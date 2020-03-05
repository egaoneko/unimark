const {
  TEMPLATES_PATH,
  PACKAGES,
  LAYERS,
} = require('./constant');
const {
  genAutocompletePrompt,
  genModuleInputPrompt,
  genClassInputPrompt,
} = require('./utils/prompt');

module.exports = (plop) => {
  plop.setGenerator('entity', {
    description: 'Create entity in package',
    prompts: [
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
        'Please choice layer',
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
        {default: 'Entity'}
      ),
    ],
    actions: function () {
      return [
        {
          type: 'add',
          path: `packages/{{package}}/src/{{layer}}/entities/{{module}}/{{class}}.ts`,
          templateFile: `${TEMPLATES_PATH}/entity/entity.hbs`,
          abortOnFail: true
        },
        {
          type: 'add',
          path: `packages/{{package}}/__tests__/{{layer}}/entities/{{module}}/{{class}}.spec.ts`,
          templateFile: `${TEMPLATES_PATH}/entity/entity-spec.hbs`,
          abortOnFail: true
        },
      ];
    }
  });
};
