import { RspackCssExtractPlugin } from "../../../../src";

module.exports = {
	entry: "./index.js",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: RspackCssExtractPlugin.loader,
						options: {
							publicPath: "static"
						}
					},
					"css-loader"
				]
			}
		]
	},
	plugins: [
		new RspackCssExtractPlugin({
			filename: "[name].css"
		})
	]
};
