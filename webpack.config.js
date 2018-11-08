/* eslint-disable */
const path = require('path');
const PROD_URL = 'https://stats-interactives.ctl.columbia.edu/';
const STAGE_URL = 'https://stats-interactives.stage.ctl.columbia.edu/';

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "bundle.min.js",
        publicPath: "/dist/",
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader']
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            options: {
                                plugins: function() {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                disable: true,
                                outputPath: 'images/',
                                name: '[name].[ext]',
                                emitFile: true
                            }
                        }
                    ]
            }
        ]
    },
}
