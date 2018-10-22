const path = require('path');

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
            }
        ]
    },
}
