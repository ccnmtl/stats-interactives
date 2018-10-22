/* eslint-disable */
const path = require('path');
const PROD_URL = 'https://stats-interactives.ctl.columbia.edu/';
const STAGE_URL = 'https://stats-interactives.stage.ctl.columbia.edu/';

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "bundle.min.js",
        publicPath: "/dist/"
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                disable: true,
                                publicPath: (() => {
                                    if (typeof env === "undefined") return 'dist/'
                                    else if (env.production) return PROD_URL
                                    else if (env.stage) return STAGE_URL
                                })()
                            }
                        }
                    ]
            }
        ]
    },
}
