const path = require('path');

const webpack = require('webpack');

const pkg = require('../package.json');

module.exports = {
  entry: './src/index.ts',
  target: 'electron-main',
  mode: 'development',
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
