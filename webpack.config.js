const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", "ts", "tsx"], // in order to import without ./App.jsx 
        alias: {
            //map the buffer module to a browser compatible version
            buffer: "buffer-es6",
            //map the stream module to a browser compatible version
            stream: "stream-browserify"
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        hot: true,
        port: 3000,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
}