const fs = require('fs');
const path = require('path');

const readFile = (file) => {
  return fs.readFileSync(file, 'utf8');
};

const readDir = (dir) => {
  return fs.readdirSync(dir);
};

const walkDir = (dir) => {
  return readDir(dir).reduce((files, file) => {
    let dirPath = path.join(dir, file);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    return isDirectory ? files.concat(walkDir(dirPath)) : [...files, path.join(dir, file)];
  }, []);
};

const getPath = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  readFile,
  readDir,
  walkDir,
  getPath,
};
