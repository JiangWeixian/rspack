const rspack = require("@rspack/core");
const refreshPlugin = require("@rspack/plugin-react-refresh");
const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	devtool: "source-map",
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	devServer: {
		devMiddleware: {
			writeToDisk: true
		}
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							sourceMap: true,
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: {
								targets: [
									"chrome >= 87",
									"edge >= 88",
									"firefox >= 78",
									"safari >= 14"
								]
							}
						}
					}
				]
			}
		]
	},
	optimization: {
		sideEffects: "flag",
		usedExports: true,
		providedExports: true,
		mangleExports: true,
		moduleIds: "named"
	},
	experiments: {
		rspackFuture: {
			newTreeshaking: true
		}
	},
	plugins: [
		new rspack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new rspack.ProgressPlugin({}),
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
		isDev ? new refreshPlugin() : null
	].filter(Boolean)
};
