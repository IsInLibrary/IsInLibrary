const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const zlib = require("zlib");

module.exports = {
    mode: "production",
    devtool: "source-map",

    entry: {
        content: './src/app/content.ts',
        popup: './src/ui/popup.tsx',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'src/js/[name].bundle.js',
        chunkFilename: 'src/js/[name]-[id].bundle.js'
    },

    plugins: [
        new CompressionWebpackPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
                params: {
                    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
            },
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: true,
        }),
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
    },

    resolveLoader: {},

    module: {
        rules: [{
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'src/test'),
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
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 5000,
            minRemainingSize: 0,
            minChunks: 2,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        runtimeChunk: true,
        usedExports: 'global',
        chunkIds: 'deterministic',
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    cache: {
        type: 'filesystem',
        hashAlgorithm: 'sha1-base64',
        compression: 'brotli',
    },
    performance: {
        maxEntrypointSize: 200000,
        maxAssetSize: 200000,
    }
};