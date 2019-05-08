var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var config = {
  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: {
    index: [path.resolve(__dirname, "src/www/index.js")]
  },
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "docs"),
    chunkFilename: "[name].[contenthash:4].bundle.js",
    filename: "[name].[contenthash:4].js",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this"
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "src/assert", to: "./" }]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/www/index.html"
    }),
    new AutoDllPlugin({
      filename: "packages-[name].[contenthash:4].dll.js",
      path: "./dll",
      inject: true,
      entry: {
        icon: ["@ant-design/icons/lib/dist.js"],
        common: ["faker", "recharts"]
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:4].css",
      chunkFilename: "[name].[contenthash:4].css"
    })
  ],
  performance: { hints: false },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    immutable: "Immutable"
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/dygraphs"),
          path.resolve(__dirname, "node_modules/react-hooks")
        ],
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 2 }], "@babel/react"],
          plugins: [
            ["import", { libraryName: "antd", libraryDirectory: "lib" }, "ant"],
            [
              "import",
              {
                libraryName: "lodash",
                libraryDirectory: "",
                camel2DashComponentName: false
              },
              "lodash"
            ],
            [
              "import",
              {
                libraryName: "lodash-fp",
                libraryDirectory: "../lodash/fp",
                camel2DashComponentName: false
              },
              "lodash-fp"
            ]
          ]
        }
      },
      {
        test: /\.worker\.js$/,
        use: [
          { loader: "worker-loader", options: { name: "worker.[hash].js" } },
          {
            loader: "babel-loader",
            query: {
              cacheDirectory: true,
              presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 2 }], "@babel/react"],
              plugins: [
                ["import", { libraryName: "antd", libraryDirectory: "lib" }, "ant"],
                [
                  "import",
                  {
                    libraryName: "lodash",
                    libraryDirectory: "",
                    camel2DashComponentName: false
                  },
                  "lodash"
                ],
                [
                  "import",
                  {
                    libraryName: "lodash-fp",
                    libraryDirectory: "../lodash/fp",
                    camel2DashComponentName: false
                  },
                  "lodash-fp"
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.cssm$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?name=[path][name].[ext]&limit=50000"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=[path][name].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "url-loader?mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?name=[path][name].[ext]&limit=50000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?name=[path][name].[ext]&limit=50000&mimetype=image/svg+xml"
      }
    ]
  }
};
module.exports = (env, argv) => {
  if (argv.mode === "development") {
  }
  if (argv.mode === "production") {
  }
  return config;
};
