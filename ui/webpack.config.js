// /*
//  * File: /home/geoff/KTDA/ui/webpack.config.js
//  * Project: /home/geoff/KTDA/ui
//  * Created Date: Saturday, May 7th 2022, 2:42:18 pm
//  * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
//  * -----
//  * Last Modified: Saturday May 7th 2022 2:42:18 pm
//  * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
//  * -----
//  * This file should not be copied and/or distributed without the express
//  * permission of Swift Lab Limited.
//  * -----
//  * Copyright (c) 2022 Swift Lab Limited.
//  */

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/ui"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};
