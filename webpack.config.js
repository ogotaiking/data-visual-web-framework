var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        index : path.resolve(__dirname, 'client/entry.js'),
        configpage : path.resolve(__dirname, 'client/comp/configpage.js'),
        iotsensor : path.resolve(__dirname, 'client/comp/iotsensor.js'),
        evpn : path.resolve(__dirname, 'client/comp/evpn.js')
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: '/js/[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: "source-map",
    module: {
        loaders: [{
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        }, {
            test: /\.js[x]?$/,
            include: [ path.resolve(__dirname, './client')],
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015','stage-0']
            }

        },{
            test: /\.js[x]?$/,
            include: [ path.resolve(__dirname, './client')],
            exclude: /node_modules/,
            loader: 'eslint-loader',
        } ]
    },
    eslint: {
      configFile: '.eslintrc'
    },
    plugins: [
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./manifest.json'),
        }),
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
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('./js/common.js')
    ]
};
