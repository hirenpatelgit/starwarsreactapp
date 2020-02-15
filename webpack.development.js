const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
  //  devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        // historyApiFallback: true,
        hot:true
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false,
              },
            }),
          ],
              splitChunks: {
            cacheGroups: {
              vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
	}
});
