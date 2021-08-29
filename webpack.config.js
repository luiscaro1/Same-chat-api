const path = require("path");

// plugins
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  target: "node",
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: path.resolve(__dirname, "node_modules"),
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    alias: {
      src: path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new Dotenv({ path: path.resolve(__dirname, "src/.env") }),
    new NodemonPlugin(),
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
  ],
};