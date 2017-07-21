const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = require('./webpack.config.production');

module.exports = merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
