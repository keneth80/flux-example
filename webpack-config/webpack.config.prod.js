'use strict';

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = merge(commonConfig, {
    mode: 'production',

    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single', // 생성된 모든 청크에서 공유할 런타임 파일을 생성
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true
            }),
            new CssMinimizerPlugin(),
        ]
    },

    plugins: [new MiniCssExtractPlugin({ filename: 'main-style.css' })],
});