const webpack = require("@rspack/core");

function createConfig(system) {
	const systemString = "" + system;
	return {
		name: `system_${systemString}`,
		module: {
			rules: [
				{
					test: /\.js$/,
					parser: {
						system
					}
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				__SYSTEM__: systemString
			})
		]
	};
}

/** @type {import("@rspack/core").Configuration[]} */
module.exports = [
	createConfig(undefined),
	createConfig(true),
	createConfig(false)
];
