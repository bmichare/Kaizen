const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './client/index',
    background: './background.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './extension'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/preset-env', '@babel/preset-react' ],
        },
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  },
  devServer: {
    static: {
      publicPath: 'build',
      directory: path.resolve(__dirname, 'build'),
    },
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './client/index.html' }),
  ],
  devtool: 'cheap-module-source-map',
};
