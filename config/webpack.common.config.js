const path = require("path");

const VueLoaderPlugin = require("vue-loader/lib/plugin");// 解析vue的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");// 生成dist中html模板的插件

const commonConfig = {
  resolve: {
    alias: {
      vue: "vue/dist/vue.js",
      "@pages": path.join(__dirname, "../src/pages"),
      "@components": path.join(__dirname, "../src/components"),
      "@router": path.join(__dirname, "../src/router"),
      "@assets": path.join(__dirname, "../src/assets")
    }
  },
  // 多文件入口
  entry: {
    app: [
      path.join(__dirname, "../src/main.js")
    ],
    common: ["vue", "vue-router"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node-modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),// vue解析插件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../index.html")
    })
  ],
};
module.exports = commonConfig;