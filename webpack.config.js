const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './static/js/index.jsx',
    output: {
        path: path.join(__dirname, 'static/js'),
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: ['components/', 'static/js/']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        '@babel/preset-react',
                        [
                            '@babel/preset-env',
                            {
                                "targets": "> 0.25%, not dead",
                                "modules": "commonjs"
                            }
                        ],
                    ],
                    // presets: ['@babel/'],
                    plugins: [
                        'transform-class-properties',
                        // 'transform-object-rest-spread',
                        'transform-strict-mode',
                        "@babel/plugin-transform-runtime"
                    ]
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
    // devtool: 'cheap-module-eval-source-map'
};