const {
  PACKAGE_ROOT_PATH,
  PACKAGES,
  LAYERS,
} = require('./constant');
const {
  genAutocompletePrompt,
} = require('./utils/prompt');
const {
  readDir,
} = require('./utils/file');
module.exports = (plop) => {
  plop.setGenerator('link-use-case', {
    description: 'Link use-case to repository',
    prompts: [
      genAutocompletePrompt(
        'useCaseModule',
        'Please choice use-case module',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/core/src/domain/use-cases`)
            .filter(file => !file.endsWith('.ts'));
          if (!input) {
            resolve(source);
          } else {
            resolve(source.filter((value) => value.toLowerCase().indexOf(input.toLowerCase()) > -1));
          }
        }),
      ),
      genAutocompletePrompt(
        'useCaseClass',
        'Please choice use-case class',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/core/src/domain/use-cases/${answer.useCaseModule}`)
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
        'repositoryPackage',
        'Please choice repository package',
        PACKAGES,
      ),
      genAutocompletePrompt(
        'repositoryLayer',
        'Please choice repository layer',
        LAYERS,
      ),
      genAutocompletePrompt(
        'repositoryModule',
        'Please choice repository module',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/${answer.repositoryPackage}/src/${answer.repositoryLayer}/repositories`)
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
          const source = readDir(`${PACKAGE_ROOT_PATH}/${answer.repositoryPackage}/src/${answer.repositoryLayer}/repositories/${answer.repositoryModule}`)
            .filter(file => file.endsWith('.ts'))
            .map(file => file.replace('.ts', ''));
          if (!input) {
            resolve(source);
          } else {
            resolve(source.filter((value) => value.toLowerCase().indexOf(input.toLowerCase()) > -1));
          }
        }),
      ),
    ],
    actions: (answer) => {
      const actions = [];

      actions.push({
        type: 'modify',
        path: `packages/{{repositoryPackage}}/src/{{repositoryLayer}}/repositories/{{repositoryModule}}/{{repositoryClass}}.ts`,
        pattern: /(\/\/ --ADD_METHOD--)/gi,
        template: answer.repositoryPackage === 'core' ?
          '{{camelCase useCaseClass}}(prop: any): Observable<any>;\r\n\n  $1' :
          'public {{camelCase useCaseClass}}(prop: any): Observable<any> {\n    return of(null);\n  }\r\n\n  $1',
        abortOnFail: true
      });

      if (answer.repositoryPackage === 'core') {
        actions.push({
          type: 'modify',
          path: `packages/{{repositoryPackage}}/__mocks__/{{repositoryModule}}/{{repositoryClass}}.ts`,
          pattern: /(\/\/ --ADD_METHOD--)/gi,
          template: `export const mock{{useCaseClass}} = jest.fn().mockImplementation((prop: any): Observable<any> => {
  return of(null);
});
$1`,
          abortOnFail: true
        });

        actions.push({
          type: 'modify',
          path: `packages/{{repositoryPackage}}/__mocks__/{{repositoryModule}}/{{repositoryClass}}.ts`,
          pattern: /(\/\/ --APPLY_METHOD--)/gi,
          template: `{{camelCase useCaseClass}}: mock{{useCaseClass}},\n    $1`,
          abortOnFail: true
        });
      }

      return actions;
    }
  });
};
