var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname + '/src/js',

    resolve: {
        root: [
            path.resolve('./src/js')
        ]
    },

    entry: {
        app: 'main',
        base: ['jquery', 'underscore', 'backbone', 'framework'],
    },

    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    },

    module: {
        loaders: [
            { test: /\.hbs$/, loader: "handlebars-loader" }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('base', 'base.js'),
        new webpack.optimize.UglifyJsPlugin({
            debug: true,
            minimize: true,
            sourceMap: true,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
};
