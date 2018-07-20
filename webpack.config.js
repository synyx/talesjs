const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV;
const isProduction = () => mode === "production";

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Tales",
    }),
    !isProduction() && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
      },
    ],
  },

  devServer: {
    port: 8080,
    hot: true,
    noInfo: true,
    after(app) {
      // eslint-disable-next-line no-console
      console.log("server is running on http://localhost:8080");
    },
  },
};
