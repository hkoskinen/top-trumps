const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-maps' : 'cheap-module-source-maps',
  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(process.cwd(), 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
