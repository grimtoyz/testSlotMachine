var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlinePlugin = require('html-webpack-inline-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');
// var package = require('./package.json');



var pluginsList = {
    devServer: [
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new HtmlWebpackPlugin({
            title: 'Test Slot Machine',
            template: path.join(__dirname, 'templates/index.html'),
        }),
        new HtmlWebpackInlinePlugin(),
        new CopyWebpackPlugin([
            { from: 'assets/', to: 'assets/' },
        ]),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false)
        })
    ],

    production: [
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new HtmlWebpackPlugin({
            title: 'Test Slot Machine',
            template: path.join(__dirname, 'templates/index.html'),
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: ['game.js']
        }),
        new HtmlWebpackInlinePlugin(),
        new CopyWebpackPlugin([
            { from: 'assets/', to: 'assets/' },
        ]),
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    properties: false
                }
            }
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)
        }),
        new ZipPlugin({
            filename: 'pa-_v1.01.1_port.zip'
        })
    ]


};

module.exports = function(env, args) {
    return {
        entry: {
            game: path.join(__dirname, 'src/framework/index.js'),
        },

        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'game.js'
        },

        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                assets: path.join(__dirname, 'assets/'),
                config: path.join(__dirname, 'src/config.json')
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                },
                {
                    test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader?name=[name].[ext]'
                }
            ]
        },

        plugins: pluginsList[env.mode],

        devtool: env.mode === 'devServer' ? 'source-map' : '',
        devServer: (env.mode === 'devServer') ? {
                contentBase: path.join(__dirname, 'dist'),
                compress: false,
                port: 9000,
                inline: true,
                overlay: true
            }
            : {}
    }
};