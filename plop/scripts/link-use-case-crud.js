const {
  PACKAGE_ROOT_PATH,
  PACKAGES,
  LAYERS,
} = require('./constant');
const {
  genAutocompletePrompt,
} = require('./utils/prompt');
const {
  readFile,
  readDir,
} = require('./utils/file');
const {
  pascalCase,
} = require('./utils/transform');
module.exports = (plop) => {
  plop.setGenerator('link-use-case-crud', {
    description: 'Link CRUD use-case to repository',
    prompts: [
      genAutocompletePrompt(
        'entityModule',
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
        'entityClass',
        'Please choice entity Class',
        (answer, input) => new Promise((resolve) => {
          input = input || '';
          const source = readDir(`${PACKAGE_ROOT_PATH}/core/src/domain/entities/${answer.entityModule}`)
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
        default: (answer) => answer.entityClass + 's',
      }
    ],
    actions: (answer) => {
      let actions = [];

      actions = [...actions, ...getImportActions(answer)];
      actions = [...actions, ...getUtilActions(answer)];

      answer.targets.forEach(target => {
        actions = [...actions, ...getTargetActions(target, answer)]
      });

      return actions;
    }
  });
};

function getImportActions(answer) {
  const actions = [];
  const repository = readFile(`${PACKAGE_ROOT_PATH}/${answer.repositoryPackage}/src/${answer.repositoryLayer}/repositories/${answer.repositoryModule}/${answer.repositoryClass}.ts`);
  const mockRepository = readFile(`${PACKAGE_ROOT_PATH}/${answer.repositoryPackage}/__mocks__/${answer.repositoryModule}/${answer.repositoryClass}.ts`);
  const entityRegex = new RegExp(`import ${answer.entityClass} from .*`);
  const optionRegex = new RegExp(`import { Options } from .*`);

  if (!entityRegex.test(repository)) {
    actions.push({
      type: 'modify',
      path: `packages/{{repositoryPackage}}/src/{{repositoryLayer}}/repositories/{{repositoryModule}}/{{repositoryClass}}.ts`,
      pattern: /(\/\/ --ADD_IMPORT--)/gi,
      template: answer.repositoryPackage === 'core' ?
        'import {{entityClass}} from \'../../entities/{{entityModule}}/{{entityClass}}\';\r\n$1' :
        'import {{entityClass}} from \'@stocker/core/lib/domain/entities/{{entityModule}}/{{entityClass}}\';\r\n$1',
      abortOnFail: true
    });
  }

  if (!optionRegex.test(repository)) {
    actions.push({
      type: 'modify',
      path: `packages/{{repositoryPackage}}/src/{{repositoryLayer}}/repositories/{{repositoryModule}}/{{repositoryClass}}.ts`,
      pattern: /(\/\/ --ADD_IMPORT--)/gi,
      template: answer.repositoryPackage === 'core' ?
        'import { Options } from \'../../../interfaces/repository/options\';\r\n$1' :
        'import { Options } from \'@stocker/core/lib/interfaces/repository/options\';\r\n$1',
      abortOnFail: true
    });
  }

  if (answer.repositoryPackage !== 'core') {
    const errorFactoryRegex = new RegExp(`import ApplicationErrorFactory from .*`);

    if (!errorFactoryRegex.test(repository)) {
      actions.push({
        type: 'modify',
        path: `packages/{{repositoryPackage}}/src/{{repositoryLayer}}/repositories/{{repositoryModule}}/{{repositoryClass}}.ts`,
        pattern: /(\/\/ --ADD_IMPORT--)/gi,
        template: 'import ApplicationErrorFactory from \'@stocker/core/lib/data/errors/ApplicationErrorFactory\';\r\n$1',
        abortOnFail: true
      });
    }

    const errorType = new RegExp(`import ErrorType from .*`);
    if (!errorType.test(repository)) {
      actions.push({
        type: 'modify',
        path: `packages/{{repositoryPackage}}/src/{{repositoryLayer}}/repositories/{{repositoryModule}}/{{repositoryClass}}.ts`,
        pattern: /(\/\/ --ADD_IMPORT--)/gi,
        template: 'import ErrorType from \'@stocker/core/lib/error/ErrorType\';\r\n$1',
        abortOnFail: true
      });
    }
  }

  if (answer.repositoryPackage === 'core') {
    if (!entityRegex.test(mockRepository)) {
      actions.push({
        type: 'modify',
        path: `packages/{{repositoryPackage}}/__mocks__/{{repositoryModule}}/{{repositoryClass}}.ts`,
        pattern: /(\/\/ --ADD_IMPORT--)/gi,
        template: 'import {{entityClass}} from \'../../src/domain/entities/{{entityModule}}/{{entityClass}}\';\r\n$1',
        abortOnFail: true
      });
    }

    if (!optionRegex.test(mockRepository)) {
      actions.push({
        type: 'modify',
        path: `packages/{{repositoryPackage}}/__mocks__/{{repositoryModule}}/{{repositoryClass}}.ts`,
        pattern: /(\/\/ --ADD_IMPORT--)/gi,
        template: 'import { Options } from \'../../src/interfaces/repository/options\';\r\n$1',
        abortOnFail: true
      });
    }
  }

  return actions;
}

function getUtilActions(answer) {
  const actions = [];
  const mockRepository = readFile(`${PACKAGE_ROOT_PATH}/${answer.repositoryPackage}/__mocks__/${answer.repositoryModule}/${answer.repositoryClass}.ts`);
  const utilRegex = new RegExp(`const cache: .*`);

  if (answer.repositoryPackage === 'core') {
    if (!utilRegex.test(mockRepository)) {
      actions.push({
        type: 'modify',
        path: `packages/{{repositoryPackage}}/__mocks__/{{repositoryModule}}/{{repositoryClass}}.ts`,
        pattern: /(\/\/ --ADD_UTIL--)/gi,
        template: `const cache: Map<string, {{entityClass}}> = new Map();
reset();

export function reset(empty: boolean = false): void {
  cache.clear();

  if (empty) {
    return;
  }
  const {{camelCase entityClass}}: {{entityClass}} = DEFAULT_{{upperCase (snakeCase entityClass)}};
  cache.set({{camelCase entityClass}}.id as string, {{camelCase entityClass}});
}\r\n$1`,
        abortOnFail: true
      });
    }
  }

  return actions;
}

function getTargetActions(target, answer) {
  const actions = [];

  let methodTemplate;
  let methodContentTemplate;
  let propTemplate;
  let retTemplate;

  if (target === 'find') {
    methodTemplate = `{{pluralEntity}}By`;
    methodContentTemplate = `  return of(Array.from(cache.values()));`;
    propTemplate = 'options: Options';
    retTemplate = '{{entityClass}}[]';
  } else if (target === 'count') {
    methodTemplate = `{{pluralEntity}}`;
    methodContentTemplate = `  return of(cache.size);`;
    propTemplate = 'options: Options';
    retTemplate = 'number';
  } else {
    methodTemplate = `{{entityClass}}`;

    if (target === 'create') {
      methodContentTemplate = `  if (cache.has({{camelCase entityClass}}.id as string)) {
    return of([cache.get({{camelCase entityClass}}.id as string) as {{entityClass}}, false]);
  } else {
    cache.set({{camelCase entityClass}}.id as string, {{camelCase entityClass}});
    return of([{{camelCase entityClass}}, true]);
  }`;
    } else {
      methodContentTemplate = `  if (cache.has({{camelCase entityClass}}.id as string)) {
    cache.set({{camelCase entityClass}}.id as string, {{camelCase entityClass}});
    return of([cache.get({{camelCase entityClass}}.id as string) as {{entityClass}}, true]);
  } else {
    return of([{{camelCase entityClass}}, false]);
  }`;
    }

    propTemplate = '{{camelCase entityClass}}: {{entityClass}}';
    retTemplate = '[{{entityClass}}, boolean]';
  }

  actions.push({
    type: 'modify',
    path: `packages/{{repositoryPackage}}/src/{{repositoryLayer}}/repositories/{{repositoryModule}}/{{repositoryClass}}.ts`,
    pattern: /(\/\/ --ADD_METHOD--)/gi,
    template: answer.repositoryPackage === 'core' ?
      `${target}${methodTemplate}(${propTemplate}): Observable<${retTemplate}>;\r\n\n  $1` :
      `public ${target}${methodTemplate}(${propTemplate}): Observable<${retTemplate}> {\n    throw ApplicationErrorFactory.getError(ErrorType.GENERAL, 'method is not implemented.');\n  }\r\n\n  $1`,
    abortOnFail: true
  });

  if (answer.repositoryPackage === 'core') {
    actions.push({
      type: 'modify',
      path: `packages/{{repositoryPackage}}/__mocks__/{{repositoryModule}}/{{repositoryClass}}.ts`,
      pattern: /(\/\/ --ADD_METHOD--)/gi,
      template: `export const mock${pascalCase(target)}${methodTemplate} = jest.fn().mockImplementation((${propTemplate}): Observable<${retTemplate}> => {
${methodContentTemplate}
});
$1`,
      abortOnFail: true
    });

    actions.push({
      type: 'modify',
      path: `packages/{{repositoryPackage}}/__mocks__/{{repositoryModule}}/{{repositoryClass}}.ts`,
      pattern: /(\/\/ --APPLY_METHOD--)/gi,
      template: `${target}${methodTemplate}: mock${pascalCase(target)}${methodTemplate},\n    $1`,
      abortOnFail: true
    });
  }

  return actions;
}