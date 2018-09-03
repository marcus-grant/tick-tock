const path = require('path');
// better for future compatibility from guide
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // mode: 'development',
  entry: { main: './src/index.js' },
  output: {
    // old boilerplate
    // filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    // new filename using caching from http://bit.ly/2JTkHt4
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // old boilerplate
        // loaders: 'babel-loader',
        // changed according to http://bit.ly/2JTkHt4
        use: {
          loader: 'babel-loader',
        },
        // options: {
        //   presets: ['react', 'stage-0', 'es2015'],
        //   plugins: ['transform-class-properties', 'transform-decorators-legacy'],
        // },
      },
      {
        test: /\.scss$/,
        // changed to use miniCSSS instead
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader', 'sass-loader'],
        // keep style loader as fallback since MiniCssExtractPlugin.loader does same?
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  devtool: 'source-map',
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public/dist'),
    // watchContentBase: true,
    hot: true,
  },
  plugins: [
    // new from http://bit.ly/2JTkHt4
    new CleanWebpackPlugin('public/dist', {}), // clean out the generated hashed and cached files
    // minify using this plugin instead of extract
    new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    // This causes the dev server to minify the code...
    // ...even though both env and flags tell it not to, this is needed...
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    // }),
    new WebpackMd5Hash(),
  ],
};
