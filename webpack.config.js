/* eslint-disable */
const path = require('path');
const PROD_URL = 'https://stats-interactives.ctl.columbia.edu/';
const STAGE_URL = 'https://stats-interactives.stage.ctl.columbia.edu/';

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "bundle.min.js",
        publicPath: "/dist/",
    },
    devServer: {
        static: {
            directory: './'
        },
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    watchOptions: {
        ignored: path.resolve(__dirname, 'node_modules')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ]
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
                            postcssOptions: {
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
                type: 'asset/resource'
            }
        ]
    }
}
