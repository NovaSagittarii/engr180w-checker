import webpack from "webpack";
// import webpackNodeExternals from 'webpack-node-externals';
// in case you run into any typescript error when configuring `devServer`
// import 'webpack-dev-server';

// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebPackPlugin from "html-webpack-plugin";
import WebpackBar from "webpackbar";
import ESLintPlugin from "eslint-webpack-plugin";

import { fileURLToPath } from "url";
import { join, dirname, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: webpack.Configuration = {
  name: "client",
  entry: "./src/main.tsx",
  output: {
    path: join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  target: "web",
  devtool: "source-map",
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      // filename: "./index.html",
    }),
    new WebpackBar(),
    new ESLintPlugin({
      cache: true,
      extensions: ["ts", "tsx", "js", "jsx"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"],
  },
  cache: {
    type: "filesystem",
    // allowCollectingMemory: true,
    // compression: 'gzip',
    buildDependencies: {
      config: [__filename],
    },
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // transpileOnly: true,
          },
        },
      },
      // {
      //   // Transpiles ES6-8 into ES5
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },
      {
        // https://gist.github.com/bradtraversy/1c93938c1fe4f10d1e5b0532ae22e16a
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  experiments: {
    asyncWebAssembly: true,
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

export default config;
