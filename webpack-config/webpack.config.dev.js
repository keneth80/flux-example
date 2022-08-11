'use strict';

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

module.exports = merge(commonConfig, {
    mode: 'development',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true // 빌드중 오류를 확인하기 위함.
    }
});