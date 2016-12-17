var path = require('path');
var webpack = require('webpack');

var ip = null;
if(process.argv[2] == 'dev'){
  ip = '0.0.0.0';
}

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + ip + ':4000',
    './src/index',
    './src/css/bootstrap.css',
    './src/css/main.css',
    './src/css/infographic.css'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style-loader!css-loader', // Run both loaders
      include: path.join(__dirname, 'src')
    }]
  }
};
