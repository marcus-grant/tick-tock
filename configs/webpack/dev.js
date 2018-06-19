// development mode specific configurations
const merge = require('webpack-merge'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const commonConfig = require('./common');

// const port = 8181;

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [ // webpack call stack (last first)
    'react-hot-loader/patch', // activate HotModuleReload in react
    // bundle the client for dev server and have it connect using this route
    'webpack-dev-server/client?http://localhost:8080',
    // bundle client for hot reload and only for real changes
    'webpack/hot/only-dev-server',
    './index.js', // the call stack starts here, start with the entry file for the app
  ],
  // source map type to use for debugging
  // if webpack starts getting slow to update the app on edits...
  // consider changing to 'cheap-module-eval-source-map'
  devtool: 'inline-source-map',
  devServer: {
    hot: true, // make sure hot module reloads are enabled
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints out module names in console to aid in debugging
  ],
});
