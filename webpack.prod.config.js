const path = require("path");

const webpack = require("webpack");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/Startup.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".js", ".tsx"],
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
    new webpack.NormalModuleReplacementPlugin(
      /m[sy]sql2?|oracle(db)?|sqlite3|pg-(native|query)/
    ),
  ],

  externals: [
    {
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      knex: "commonjs knex",
    },
  ],
};
