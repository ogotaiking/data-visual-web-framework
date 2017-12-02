const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-highcharts',
    'react-bootstrap',
    'highcharts',
    'highcharts/highstock.js',
    'react-highcharts/dist/ReactHighstock.js',
    'antd/lib/date-picker',
    'antd/lib/date-picker/style',
    'antd/lib/table',
    'antd/lib/table/style',
    'antd/lib/layout',
    'antd/lib/layout/style',
    'antd/lib/menu',
    'antd/lib/menu/style',
    'antd/lib/breadcrumb',
    'antd/lib/breadcrumb/style',
    'antd/lib/icon',
    'antd/lib/icon/style',
    'echarts',



//    'antd',
//    'antd/dist/antd.css',
    'css-loader/lib/css-base.js',
    'style-loader/addStyles.js',
    'babel-polyfill',
    'jquery'
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
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),

        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),

    ],
};
