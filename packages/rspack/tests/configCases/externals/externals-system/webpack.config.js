/** @type {import("@rspack/core").Configuration} */
module.exports = {
	output: {
		libraryTarget: "system"
	},
	experiments: {
		rspackFuture: { newTreeshaking: false }
	},
	externals: {
		external1: "external1",
		external2: "external2",
		external3: "external3",
		external4: "external4",
		external5: "external5"
	}
};
