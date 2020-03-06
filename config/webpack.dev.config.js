const commonConfig = require('./webpack.common.config.js');
const merge = require('webpack-merge');
const path = require("path");

const devConfig = {
  mode: "development",
  //在线编译配置
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: "8888",
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader", "less-loader"]
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
  plugins: [],
};

module.exports = merge(commonConfig, devConfig);