const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const sharedConfig = {
    mode: 'development',
    devtool: 'source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    // Suppress fatal error: Cannot resolve module 'fs'
    // @relative https://github.com/pugjs/pug-loader/issues/8
    // @see https://github.com/webpack/docs/wiki/Configuration#node
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname + '//..' // see https://github.com/johnagan/clean-webpack-plugin/issues/76#issuecomment-369813202
        })
    ],
    watchOptions: {
        aggregateTimeout: 300
    }
};

const mainConfig = {
    ...sharedConfig,
    name: 'main',
    entry: './index.ts',
    output: {
        filename: './project_name.js',
        library: 'default',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this', // webpack bug workaround, see https://github.com/webpack/webpack/issues/6784
    },
};
const testConfig = {
    ...sharedConfig,
    name: 'test',
    entry: './tests/index.spec.ts',
    output: { filename: './test.js' },
};

module.exports = [mainConfig, testConfig];