import {
  CreateNodeArgs,
} from 'gatsby';

export async function onCreateBabelConfig({ actions }: CreateNodeArgs) {
  actions.setBabelPlugin({
    name: `babel-plugin-import`,
    options: {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }
  });
}
