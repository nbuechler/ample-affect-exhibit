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
    'webpack/hot/only-dev-server',
    './src/index',
    './src/css/bootstrap.css'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style-loader!css-loader', // Run both loaders
      include: path.join(__dirname, 'src')
    }]
  }
};
