const path = require('path');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')

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
        filename: 'src/js/[name].js'
    },

    plugins: [
        new CompressionWebpackPlugin(),
        new ESLintPlugin({ cache: true }),
        new StylelintPlugin({ files: '**/*.css', cache: true }),
        new MiniCssExtractPlugin({
            linkType: false,
            filename: 'src/css/[name].css',
        })
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
        rules: [
            { loader: 'ts-loader' },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    cache: {
        type: 'filesystem',
        compression: 'brotli',
    }
};