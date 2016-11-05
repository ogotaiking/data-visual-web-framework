const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-highcharts',
    'highcharts',
    'highcharts/highstock.js',
    'react-highcharts/dist/ReactHighstock.js',
    'antd',
    'antd/dist/antd.css',
    'css-loader/lib/css-base.js',
    'style-loader/addStyles.js',
    'babel-polyfill',
];

module.exports = {
    output: {
        path: 'public/js',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "vendor": vendors,
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),

    ],
};
