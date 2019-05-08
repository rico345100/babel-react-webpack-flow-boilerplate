const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		hot: true,  // Enabling HMR
		port: 3300
	},
	entry: {
		bundle: './src/js/index.js',
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'prop-types',
			'core-js'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[hash].js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
          MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: true,
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							localIdentName: '[name].[sha512:hash:base32].[local]',
							modules: true,
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [
								'./src/css'
							],
							sourceMap: true
						}
					}
				]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }]
      }
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './src/index.html'
    }),
    // Don't know why, but not using this plugin will not request fonts
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
		// NamedModulesPlugin: The relative path of the module to be displayed when HMR is enabled.
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom'
		},
		modules: [
			path.resolve('./src'),
			path.resolve('./src/js'),
			path.resolve('./node_modules')
		]
	}
};
