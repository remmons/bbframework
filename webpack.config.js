var path = require('path');
var webpack = require("webpack");

module.exports = {
    context: __dirname + "/src/js",

    resolve: {
        root: [
            path.resolve('./src/js')
        ]
    },

    entry: {
        app: "main",
        base: ["jquery", "underscore", "backbone", "framework"],
    },

    output: {
        path: __dirname + "/dist/js",
        filename: "bundle.js"
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin("base", "base.bundle.js")
    ]
};
