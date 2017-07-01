// for storybook
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');
const os = require('os');

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config');
const customConfig = require('./webpack.config.base');

const isWindows = os.platform() === 'win32';

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    // Extend it as you need.

    // For load sass
    config.module.rules.push({
        test: /\.sass$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
    });

    // For automatic open default Broswer
    config.plugins.push(
        new WebpackShellPlugin({
            onBuildStart: [],
            onBuildEnd: [`${isWindows?'start':'open'} http://localhost:9001`]
        })
    );

    return config;
};