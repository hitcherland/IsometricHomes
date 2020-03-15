const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    emitWarning: true,
                    configFile: "./.eslintrc.json"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'isometric'
        })
    ]
}
