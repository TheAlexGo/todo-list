const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@components': path.resolve('./src/components'),
            '@styles': path.resolve('./src/styles'),
            '@features': path.resolve('./src/features'),
            '@static': path.resolve('./src/static'),
            '@icons': path.resolve('./src/static/icons'),
            '@fonts': path.resolve('./src/static/fonts'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new EslintWebpackPlugin({
            files: '{**/*,*}.{tsx,ts,js}',
        }),
        new StylelintWebpackPlugin({
            files: '{**/*,*}.css',
        }),
    ],
    devServer: {
        open: true,
        historyApiFallback: true,
    },
};
