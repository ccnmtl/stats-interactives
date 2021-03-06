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
        inline: true,
        contentBase: './',
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
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
                    },
                    {
                        loader: 'eslint-loader'
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
