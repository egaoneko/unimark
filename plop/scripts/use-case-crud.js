const {
  TEMPLATES_PATH,
  PACKAGE_ROOT_PATH,
} = require('./constant');
const {
  genAutocompletePrompt,
} = require('./utils/prompt');
const {
  readDir,
} = require('./utils/file');
module.exports = (plop) => {
  plop.setGenerator('use-case-crud', {
    description: 'Create use-case-crud in package',
    prompts: [
      genAutocompletePrompt(
        'module',
        'Please choice entity module',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/core/src/domain/entities`)
            .filter(file => !file.endsWith('.ts'));
          if (!input) {
            resolve(source);
          } else {
            resolve(source.filter((value) => value.toLowerCase().indexOf(input.toLowerCase()) > -1));
          }
        }),
      ),
      genAutocompletePrompt(
        'entity',
        'Please choice repository class',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/core/src/domain/entities/${answer.module}`)
            .filter(file => file.endsWith('.ts'))
            .map(file => file.replace('.ts', ''));
          if (!input) {
            resolve(source);
          } else {
            resolve(source.filter((value) => value.toLowerCase().indexOf(input.toLowerCase()) > -1));
          }
        }),
      ),
      genAutocompletePrompt(
        'repositoryModule',
        'Please choice repository module',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/core/src/domain/repositories`)
            .filter(file => !file.endsWith('.ts'));
          if (!input) {
            resolve(source);
          } else {
            resolve(source.filter((value) => value.toLowerCase().indexOf(input.toLowerCase()) > -1));
          }
        }),
      ),
      genAutocompletePrompt(
        'repositoryClass',
        'Please choice repository class',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/core/src/domain/repositories/${answer.repositoryModule}`)
            .filter(file => file.endsWith('.ts'))
            .map(file => file.replace('.ts', ''));
          if (!input) {
            resolve(source);
          } else {
            resolve(source.filter((value) => value.toLowerCase().indexOf(input.toLowerCase()) > -1));
          }
        }),
      ),
      {
        type: 'checkbox',
        name: 'targets',
        message: 'Please check targets',
        choices: ['create', 'find', 'update', 'delete', 'count'],
        default: ['create', 'find', 'update', 'delete', 'count'],
      },
      {
        type: 'input',
        name: 'pluralEntity',
        message: 'Please input plural entity',
        default: (answer) => answer.entity + 's',
      }
    ],
    actions: (answer) => {
      const actions = [];

      if (answer.targets.indexOf('create') > -1) {
        actions.push({
          type: 'add',
          path: `packages/core/src/domain/use-cases/{{module}}/Create{{entity}}.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-create.hbs`,
          abortOnFail: true
        });

        actions.push({
          type: 'add',
          path: `packages/core/__tests__/domain/use-cases/{{module}}/Create{{entity}}.spec.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-create-spec.hbs`,
          abortOnFail: true
        });
      }

      if (answer.targets.indexOf('find') > -1) {
        actions.push({
          type: 'add',
          path: `packages/core/src/domain/use-cases/{{module}}/Find{{pluralEntity}}By.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-find.hbs`,
          abortOnFail: true
        });

        actions.push({
          type: 'add',
          path: `packages/core/__tests__/domain/use-cases/{{module}}/Find{{pluralEntity}}By.spec.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-find-spec.hbs`,
          abortOnFail: true
        });
      }

      if (answer.targets.indexOf('update') > -1) {
        actions.push({
          type: 'add',
          path: `packages/core/src/domain/use-cases/{{module}}/Update{{entity}}.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-update.hbs`,
          abortOnFail: true
        });

        actions.push({
          type: 'add',
          path: `packages/core/__tests__/domain/use-cases/{{module}}/Update{{entity}}.spec.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-update-spec.hbs`,
          abortOnFail: true
        });
      }

      if (answer.targets.indexOf('delete') > -1) {
        actions.push({
          type: 'add',
          path: `packages/core/src/domain/use-cases/{{module}}/Delete{{entity}}.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-delete.hbs`,
          abortOnFail: true
        });

        actions.push({
          type: 'add',
          path: `packages/core/__tests__/domain/use-cases/{{module}}/Delete{{entity}}.spec.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-delete-spec.hbs`,
          abortOnFail: true
        });
      }

      if (answer.targets.indexOf('count') > -1) {
        actions.push({
          type: 'add',
          path: `packages/core/src/domain/use-cases/{{module}}/Count{{pluralEntity}}.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-count.hbs`,
          abortOnFail: true
        });

        actions.push({
          type: 'add',
          path: `packages/core/__tests__/domain/use-cases/{{module}}/Count{{pluralEntity}}.spec.ts`,
          templateFile: `${TEMPLATES_PATH}/use-case/use-case-count-spec.hbs`,
          abortOnFail: true
        });
      }

      return actions;
    }
  });
};
