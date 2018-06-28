const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 8000
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
