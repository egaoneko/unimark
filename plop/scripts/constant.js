const {
  readDir,
  getPath,
} = require('./utils/file');

const ROOT_PATH = getPath('/../../..');
const PACKAGE_ROOT_PATH = ROOT_PATH + '/packages';
const TEMPLATES_PATH = 'plop/templates';

const PACKAGES = readDir(PACKAGE_ROOT_PATH);
const LAYERS = ['domain', 'data'];
const TYPE = ['interface', 'class'];

module.exports = {
  ROOT_PATH,
  PACKAGE_ROOT_PATH,
  TEMPLATES_PATH,
  PACKAGES,
  LAYERS,
  TYPE,
};
