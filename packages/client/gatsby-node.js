require('ts-node').register();

const { createPages } = require('./src/libs/createPages');
const { onCreateBabelConfig } = require('./src/libs/onCreateBabelConfig');
const { onCreateWebpackConfig } = require('./src/libs/onCreateWebpackConfig');

exports.createPages = createPages;
exports.onCreateBabelConfig = onCreateBabelConfig;
exports.onCreateWebpackConfig = onCreateWebpackConfig;
