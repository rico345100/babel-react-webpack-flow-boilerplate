process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

if (process.env.BUILD_ANALYZE) {
	plugins.push(
		new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin()
	);
}

module.exports = {
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
					name: 'vendor',
					chunks: 'all'
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
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							localIdentName:
								'[name].[sha512:hash:base32].[local]',
							modules: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: ['./src/css']
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ],
	resolve: {
		modules: [
			path.resolve('./src'),
			path.resolve('./src/js'),
			path.resolve('./node_modules')
		]
	}
};
