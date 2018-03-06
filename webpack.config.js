var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

function root(srcPath) {
  return path.resolve(__dirname, srcPath);
}

module.exports = function () {
  return [{
    entry: './src/main.ts',
    output: {
      filename: 'main.js',
      path: root('dist'),
      library: 'api',
      libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'awesome-typescript-loader', options: { configFileName: './tsconfig.json' }}
      ]
    },
    plugins: [],
    externals: [nodeExternals()]
  }];
}
