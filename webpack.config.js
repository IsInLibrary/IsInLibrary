const path = require('path');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        content: './src/app/content.ts',
        background: './src/app/background.ts',
        popup: './src/ui/popup.tsx',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'src/js/[name].bundle.js'
    },

    plugins: [
        new CompressionWebpackPlugin(),
        new ESLintPlugin({ cache: true }),
        new StylelintPlugin({ files: '**/*.css', cache: true }),
        new MiniCssExtractPlugin({
            filename: 'src/css/[name].css',
            chunkFilename: "src/css/[name]-[id].css",
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: path.resolve(__dirname, 'src/popup.html'),
            chunks: ['popup']
        }),
    ],


    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        plugins: [
            PnpWebpackPlugin
        ],
    },

    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module)
        ],
    },

    module: {
        rules: [{
                test: /\.tsx?$/,
                use: [{
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                target: "es2015",
                                syntax: "typescript",
                                jsx: true,
                            },
                            transform: {
                                react: {
                                    pragma: "React.createElement",
                                    pragmaFrag: "React.Fragment",
                                    throwIfNamespace: true,
                                    development: false,
                                    useBuiltins: false,
                                },
                            },
                        }
                    }
                }],
            },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        chunkIds: 'deterministic',
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    cache: {
        type: 'filesystem',
        hashAlgorithm: 'sha1-base64',
        compression: 'brotli',
    }
};