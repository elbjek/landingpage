const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const globSync = require('glob').sync;
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
module.exports = (env, options) => ({
  entry: ['./src/index.js'],
  devServer: {
    host: '0.0.0.0', //your ip address
    port: 8080,
    disableHostCheck: true,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':srcset', ':data-srcset', ':data-bg', ':data-src'],
          },
        },
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
    ],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 8 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: true,
                },
              ],
            },
          ],
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
    // ...globSync('src/**/*.html').map((fileName) => {
    //   return new HtmlWebpackPlugin({
    //     template: fileName,
    //     inject: true,
    //     filename: fileName.replace('src/', ''),
    //   });
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: './index.html',
      title: 'MONG Studio',
      scriptLoading: 'defer',
    }),
    new HtmlWebpackPugPlugin({
      adjustIndent: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Dropdown!bootstrap/js/dist/modal',
    }),
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all',
    // },
    minimizer: [
      new TerserPlugin(),
      new CompressionPlugin({
        test: /\.js$|\.css(\?.*)?$/i,
      }),
      new CssMinimizerPlugin(),
    ],
  },
});
