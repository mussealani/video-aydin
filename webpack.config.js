const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname),
    historyApiFallback: true,
    publicPath: '/',
    compress: true,
    port: 8080
  },
  resolve: {
    alias: {
        videojs: 'video.js',
        WaveSurfer: 'wavesurfer.js'
    }
},
  plugins: [
    new UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      videojs: 'video.js/dist/video.cjs.js',
      RecordRTC: 'recordrtc'
  }),
  ]
};
