const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const webpack = require("webpack");
module.exports = {
    entry: {
        app: "./src/main.js"
    },
    output: {
        filename: "js/[name]-[hash:8].js",
        path: path.resolve(__dirname, "./build")
    },
    // devtool:"cheap-module-source-map", //开发环境
    devtool: "nosources-cheap-source-map", //生产换件推荐这个配置 ,它会报告错误代码在哪里生成,而且不会暴露源码
    mode: "development",
    optimization:{
        splitChunks: {
            chunks: 'initial',
            automaticNameDelimiter: '.',
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: 1
              }
            }
          },
          runtimeChunk: {
            name: entrypoint => `manifest.${entrypoint.name}`
          }
    },
    devServer: {
        // contentBase: "./build",
        open: true,
        port: 8082
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../img",
                        outputPath: "img",
                        limit: 1024*3
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../font",
                        outputPath: "font",
                        limit: 1024*3
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "vue title",
            filename: "index.html",
            template: "./src/public/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[chunkhash:8].css"
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}