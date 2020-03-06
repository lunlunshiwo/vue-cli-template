const commonConfig = require('./webpack.common.config.js');
const merge = require('webpack-merge');
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");// 清除以前的打包文件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");//压缩css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 分离css代码

const config = {
  mode: "production",
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "./",
    filename: "js/[chunkhash].bundle.js",
    chunkFilename: "js/[name].chunk.js",

  },
  optimization: {
    // 分割打包
    splitChunks: {
      cacheGroups: {
        vendor: {   // 抽离第三方插件
          test: /node_modules/,   // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor",  // 打包后的文件名，任意命名   
          priority: 10// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
          chunks: "initial",
          name: "utils",  // 任意命名
          minSize: 0    // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: "url-loader",
          options: {
            esModule: false,
            name: "./assets/[name].[ext]",
            limit: 10240
          }
        }]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000,
              publicPath: "./assets/fonts/",
              outputPath: "./assets/fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[chunkhash].bundle.css',
      chunkFilename: 'css/[chunkhash].chunk.css',
      ignoreOrder: false
    }),
    new OptimizeCssAssetsPlugin(),//执行压缩抽离出来的css
    new CleanWebpackPlugin(),//清除多次生成的缓存文件
  ],
};

module.exports = merge(commonConfig, config);