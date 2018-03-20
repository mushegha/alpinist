const path = require('path')
const webpack = require('webpack')

const resolve = p => path.resolve(__dirname, p)

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src/components'),
      '~': resolve('src')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    disableHostCheck: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
