var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var ip = null;
if(process.argv[2] == 'dev'){
  ip = '0.0.0.0';
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(4000, ip, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + ip + ':4000');
});
