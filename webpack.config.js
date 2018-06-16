const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js', './src/styles/main.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates css into commonJS
          },
          {
            loader: 'sass-loader', // compiles SASS into CSS
          },
        ],
        // loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      // Causes linter errors for files I import through npm?
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loaders: 'eslint-loader',
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        options: {
          presets: ['react', 'stage-0', 'es2015'],
          plugins: ['transform-class-properties', 'transform-decorators-legacy'],
        },
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  devServer: {
    contentBase: './public/',
    watchContentBase: true,
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
