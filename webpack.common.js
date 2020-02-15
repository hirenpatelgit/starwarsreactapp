const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
        chunkFilename: '[id]-[hash].chunk.js',
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new CleanWebpackPlugin(['build/*']),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            }
        ]
    }
};