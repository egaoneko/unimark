const {
  TEMPLATES_PATH,
  PACKAGE_ROOT_PATH,
} = require('./constant');
const {
  genAutocompletePrompt,
  genModuleInputPrompt,
  genClassInputPrompt,
} = require('./utils/prompt');
const {
  readDir,
} = require('./utils/file');

module.exports = (plop) => {
  plop.setGenerator('mapper', {
    description: 'Create mapper in package',
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
        'Please choice entity class',
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
        'type',
        'Please choice type',
        [
          'JSON'
        ],
      ),
    ],
    actions: (answer) => {
      const actions = [];

      console.log(answer);

      switch (answer.type) {
        case 'JSON':
          actions.push({
            type: 'add',
            path: `packages/core/src/data/mappers/{{module}}/{{entity}}JSONMapper.ts`,
            templateFile: `${TEMPLATES_PATH}/mapper/json-mapper.hbs`,
            abortOnFail: true
          });

          actions.push({
            type: 'add',
            path: `packages/core/__tests__/data/mappers/{{module}}/{{entity}}JSONMapper.spec.ts`,
            templateFile: `${TEMPLATES_PATH}/mapper/json-mapper-spec.hbs`,
            abortOnFail: true
          });
          break
      }

      return actions;
    }
  });
};
