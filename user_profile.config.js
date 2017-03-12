var webpack = require('webpack');
var path = require('path');
var libs = require('./gulp/common/libs');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractTextPlugin = new ExtractTextPlugin('public/apps/[name]/styles.css');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: '#source-map',//'#inline-source-map',
    // context: __dirname,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot-loader', 'babel-loader']
        },{
            test: /\.scss$/,
            loader: extractTextPlugin.extract(['css-loader', 'sass-loader']),
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: __dirname + '/',
        publicPath: `/public`,
        filename: 'public/apps/[name]/app.js'
    },
    externals: {
        'jquery': 'jQuery',
    },
    entry: {
        'user_profile': [
            'webpack-dev-server/client?http://localhost:9000/public/',
            'webpack/hot/only-dev-server',
            './apps/user_profile/entry.jsx',
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
        new webpack.HotModuleReplacementPlugin(),
        extractTextPlugin,
        new HtmlWebpackPlugin({
            filename: 'public/apps/user_profile/index.html',
            template: 'template/index.html'
        }),
    ]
}
