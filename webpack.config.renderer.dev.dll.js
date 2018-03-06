/**
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import { dependencies } from './package.json';
import baseConfig from './webpack.config.base';

const dist = path.resolve(__dirname, 'build');

export default merge.smart(baseConfig, {
  context: __dirname,
  target: 'electron-renderer',

  entry: {
    renderer: Object.keys(dependencies || {}),
  },

  output: {
    library: 'renderer',
    path: dist,
    filename: '[name].dev.dll.js',
    libraryTarget: 'var',
  },

  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(dist, '[name].json'),
      name: '[name]',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
});
