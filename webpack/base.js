const path = require('path');
const webpack = require('webpack');

const configSchema = require('./config_schema');
const config = require('../config.json');
const pkg = require('../package.json');

const { error } = configSchema.validate(config, { allowUnknown: true });
if (error) {
  throw error;
}

module.exports = {
  entry: './src/index.ts',
  target: 'electron-main',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(pkg.version),
        UI_ORIGIN: JSON.stringify(config.ui_origin),
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  experiments: {
    topLevelAwait: true,
  },
};
